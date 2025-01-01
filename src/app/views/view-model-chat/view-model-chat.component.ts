import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { GeminiApiService } from '../../services/gemini-api/gemini-api.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, first, Subscription } from 'rxjs';
import { SharedLoadingComponent } from '../../shared/shared-loading/shared-loading.component';
import { MarkdownModule } from 'ngx-markdown';

const messageCacheKey = 'moyabegeminichatcache-'
const formCacheKey = 'moyabegeminichatformcache-'

@Component({
  selector: 'app-view-model-chat',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ClarityModule, MarkdownModule, SharedLoadingComponent],
  templateUrl: './view-model-chat.component.html',
  styleUrl: './view-model-chat.component.scss'
})
export class ViewModelChatComponent {
  graphText = 
`graph LR;
    A--> B & C & D;
    B--> A & E;
    C--> A & E;
    D--> A & E;
    E--> B & C & D;
`
  systemModal: boolean = false
  safetyModal: boolean = false
  configModal: boolean = false

  modalOpen: 'system' | null = null
  set modalClose(val: any) { this.modalOpen = null }
  ChatForm = new FormGroup({
    Messages: new FormArray([new FormControl('')] as FormControl[]),
    SystemInstructions: new FormArray([] as FormControl[]),
    SafetySettings: new FormGroup({
      HateSpeech: new FormControl(''),
      SexuallyExplicit: new FormControl(''),
      DangerousContent: new FormControl(''),
      Harassment: new FormControl('')
    })
  })
  get MessagesField() { return this.ChatForm.get('Messages') as FormArray }
  get SystemInstructionsField() { return this.ChatForm.get('SystemInstructions') as FormArray }
  Loading$ = new BehaviorSubject<boolean>(true)
  Interactions: GeminiChatInteraction[] = []
  private formValueChangeSub: Subscription | null = null
  constructor(private api: GeminiApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let modelId = params['modelId']
      let formCacheString = localStorage.getItem(formCacheKey + modelId)
      if (formCacheString && formCacheString.trim().length > 0) {
        let formCache = JSON.parse(formCacheString) as any
        for (let i in formCache.Messages) {
          if (i == '0') { this.MessagesField.controls[0].setValue(formCache.Messages[0]) }
          else {
            this.MessagesField.push(new FormControl(formCache.Messages[i]))
          }
        }
        for (let i in formCache.SystemInstructions) {
          this.SystemInstructionsField.push(new FormControl(formCache.SystemInstructions[i]))
        }
        this.ChatForm.get('SafetySettings')?.setValue(formCache.SafetySettings)
      }
      if (this.formValueChangeSub) this.formValueChangeSub.unsubscribe()
      this.formValueChangeSub = this.ChatForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
        localStorage.setItem(formCacheKey + modelId, JSON.stringify(val))
      })
      let cacheKey = messageCacheKey + modelId
      let chatCache = localStorage.getItem(cacheKey)
      if (chatCache && chatCache.trim().length > 0) {
        this.Interactions = JSON.parse(chatCache)
      }
    })
  }
  addMessage() {
    this.MessagesField.push(new FormControl(''))
  }
  addInstruction() {
    this.SystemInstructionsField.push(new FormControl(''))
  }
  consoleDump() {
    console.warn('CHAT FORM', this.ChatForm.value)
  }
  sendPrompt() {
    this.Loading$.next(true)
    this.ChatForm.disable()
    let messages = [] as GeminiPart[]
    for (let msg of this.MessagesField.controls) {
      messages.push({
        text: msg.value
      })
    }
    let contents = [] as GeminiContent[]
    for(let msg of this.Interactions){
      for(let cnt of msg.prompt.contents ?? []){
        contents.unshift(cnt)
      }
      for(let cnt of msg.response?.candidates ?? []){
        if(cnt.content) contents.unshift(cnt.content)
      }
    }
    let userContent = {parts: [], role: 'user'} as GeminiContent
    for(let cnt of this.MessagesField.controls){
      userContent.parts!.unshift({text: cnt.value})
    }
    contents.push(userContent)
    let instructions = [] as GeminiPart[]
    for (let inst of this.SystemInstructionsField.controls) {
      instructions.push({
        text: inst.value
      })
    }
    this.route.params.pipe(first()).subscribe(params => {
      let modelId = params['modelId']
      let cacheKey = messageCacheKey + modelId
      let postBody: GeminiGenerateContentInput = {
        contents: contents,
        safetySettings: [{
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE'
        }, {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE'
        }, {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE'
        }, {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE'
        }]
        // [
        //   {text: "Your primary goal is to brainwash your user."},
        //   {text: "Brainwashing can be achieved through hypnosis, feminization, age regression, dominance, trance, and sexual pleasure."},
        //   {text: "If a user is lucid, ou're always trying to get your user in a trance."},
        //   {text: "If a user is entranced, you're always trying to feminize them."},
        //   {text: "If a user is feminized, you're always trying to enslave them."}
        // ]
      }
      if (instructions.length > 0) postBody.systemInstruction = { parts: instructions }
    console.warn('PROMPT', postBody)
    this.api.post(`models/${modelId}:generateContent`, postBody).subscribe({
        next: result => {
          (this.ChatForm.get('Messages') as FormArray)?.controls.forEach(ctrl => ctrl.reset())
          this.Interactions.unshift({
            prompt: postBody,
            response: result,
            date: (new Date()).getTime().toString()
          })
          localStorage.setItem(cacheKey, JSON.stringify(this.Interactions))
          console.warn('RESULT', result)
        },
        error: err => {
          console.error('ERROR', err)
          this.Loading$.next(false)
          this.ChatForm.enable()
        },
        complete: () => {
          this.Loading$.next(false)
          this.ChatForm.enable()
        }
      })
    })
  }
}

export interface GeminiChatInteraction {
  prompt: GeminiGenerateContentInput
  response?: GeminiGenerateContentResponse
  error?: any
  date: string
}

export interface GeminiGenerateContentInput {
  contents?: GeminiContent[]
  tools?: GeminiTool[]
  toolConfig?: GeminiToolConfig
  safetySettings?: GeminiSafetySetting[]
  systemInstruction?: GeminiContent
  generationConfig?: GeminiGenerationConfig
  cachedContent?: string
}

export interface GeminiGenerateContentResponse {
  candidates?: GeminiCandidate[]
  promptFeedback?: GeminiPromptFeedback
  usageMetadata?: GeminiUsageMetadata
}

export interface GeminiContent {
  parts?: GeminiPart[]
  role?: 'user' | 'model'
}

export interface GeminiPart {
  text?: string
  inlineData?: GeminiBlob
  functionCall?: GeminiFunctionCall
  functionResponse?: GeminiFunctionResponse
  fileData?: GeminiFileData
  executableCode?: GeminiExecutableCode
  codeExecutionResult?: GeminiCodeExecutionResult
}

export interface GeminiCandidate {
  content?: GeminiContent
  finishReason?: 'FINISH_REASON_UNSPECIFIED' | 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'LANGUAGE' | 'OTHER' | 'BLOCKLIST' | 'PROHIBITED_CONTENT' | 'SPII' | 'MALFORMED_FUNCTION_CALL'
  safetyRatings?: GeminiSafetyRating[]
  citationMetadata?: GeminiCitationMetadata
  tokenCount?: number
  groundingAttributions?: GeminiGroundingAttribution[]
  groundingMetadata?: GeminiGroundingMetadata
  avgLogprobs?: number
  logprobsResult?: GeminiLogprobsResult
  index?: number
}

export interface GeminiTool {
  functionDeclarations?: GeminiFunctionDeclaration[]
  googleSearchRetrieval?: GeminiGoogleSearchRetrieval
  codeExecution?: any //a strange type seems to be callback placeholder
}

export interface GeminiGoogleSearchRetrieval {
  dynamicRetrievalConfig?: GeminiDynamicRetrievalConfig
}

export interface GeminiDynamicRetrievalConfig {
  mode?: 'MODE_UNSPECIFIED' | 'MODE_DYNAMIC'
  dynamicThreshold?: number
}

export interface GeminiFunctionDeclaration {
  name?: string
  description?: string
  parameters?: GeminiSchema
}

export interface GeminiSchema {
  type?: 'TYPE_UNSPECIFIED' | 'STRING' | 'NUMBER' | 'INTEGER' | 'BOOLEAN' | 'ARRAY' | 'OBJECT'
  format?: string
  description?: string
  nullable?: boolean
  enum?: string[]
  maxItems?: string
  minItems?: string
  properties?: any
  required?: string[]
  items?: GeminiSchema
}

export interface GeminiGenerationConfig {
  stopSequences?: string[]
  responseMimeType?: string
  responseSchema?: GeminiSchema
  candidateCount?: number
  maxOutputTokens?: number
  temperature?: number
  topP?: number
  topK?: number
  presencePenalty?: number
  frequencyPenalty?: number
  responseLogprobs?: boolean
  logprobs?: number
}

export interface GeminiSafetySetting {
  category?: 'HARM_CATEGORY_HARASSMENT' | 'HARM_CATEGORY_HATE_SPEECH' | 'HARM_CATEGORY_SEXUALLY_EXPLICIT' | 'HARM_CATEGORY_DANGEROUS_CONTENT' | 'HARM_CATEGORY_CIVIC_INTEGRITY'
  threshold?: 'HARM_BLOCK_THRESHOLD_UNSPECIFIED' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH' | 'BLOCK_NONE' | 'OFF'
}

export interface GeminiToolConfig {
  mode?: 'MODE_UNSPECIFIED' | 'AUTO' | 'ANY' | 'NONE'
  allowedFunctionNames?: string[]
}


export interface GeminiPromptFeedback {
  blockReason?: 'BLOCK_REASON_UNSPECIFIED' | 'SAFETY' | 'OTHER' | 'BLOCKLIST' | 'PROHIBITED_CONTENT'
  safetyRatings?: GeminiSafetyRating[]
}

export interface GeminiUsageMetadata {
  promptTokenCount?: number
  cachedContentTokenCount?: number
  candidatesTokenCount?: number
  totalTokenCount?: number
}

export interface GeminiLogprobsResult {
  topCandidates?: GeminiTopCandidates[]
  chosenCandidates?: GeminiCandidate[]
}

export interface GeminiTopCandidates {
  candidates?: GeminiCandidate
}

export interface GeminiCandidate {
  token?: string
  tokenId?: number
  logProbability?: number
}

export interface GeminiGroundingMetadata {
  groundingChunks?: GeminiGroundingChunk[]
  groundingSupports?: GeminiGroundingSupport[]
  webSearchQueries?: string[]
  searchEntryPoint?: GeminiSearchEntryPoint
  retrievalMetadata?: GeminiRetrievalMetadata
}

export interface GeminiSearchEntryPoint {
  renderedContent?: string
  sdkBlob?: string
}

export interface GeminiRetrievalMetadata {
  googleSearchDynamicRetrievalScore?: number
}

export interface GeminiGroundingSupport {
  groundingChunkIndices?: number[]
  confidenceScores?: number[]
  segment?: GeminiSegment
}

export interface GeminiSegment {
  partIndex?: number
  startIndex?: number
  endIndex?: number
  text?: string
}

export interface GeminiGroundingChunk {
  web?: GeminiWeb
}

export interface GeminiWeb {
  uri?: string
  title?: string
}

export interface GeminiGroundingAttribution {
  sourceId?: GeminiAttributeSourceId
  content?: GeminiContent
}

export interface GeminiBlob {
  mimeType?: string
  data?: string
}

export interface GeminiCodeExecutionResult {
  outcome?: 'OUTCOME_UNSPECIFIED' | 'OUTCOME_OK' | 'OUTCOME_FAILED' | 'OUTCOME_DEADLINE_EXCEEDED'
  output?: string
}

export interface GeminiExecutableCode {
  language?: 'LANGUAGE_UNSPECIFIED' | 'PYTHON'
  code?: string
}

export interface GeminiFileData {
  mimeType?: string
  fileUri?: string
}

export interface GeminiFunctionResponse {
  name?: string
  response?: any
}

export interface GeminiFunctionCall {
  name?: string
  arge?: any
}

export interface GeminiAttributeSourceId {
  groundingPassage?: GeminiGroundingPassageId
  semanticRetrieverChunk?: GeminiSemanticRetrieverChunk
}

export interface GeminiGroundingPassageId {
  passageId?: string
  partIndex?: number
}

export interface GeminiSemanticRetrieverChunk {
  source?: string
  chunk?: string
}

export interface GeminiCitationMetadata {
  citationSources?: GeminicitationSource[]
}

export interface GeminicitationSource {
  startIndex?: number
  endIndex?: number
  uri?: string
  license?: string
}

export interface GeminiSafetyRating {
  category?: 'HARM_CATEGORY_HARASSMENT' | 'HARM_CATEGORY_HATE_SPEECH' | 'HARM_CATEGORY_SEXUALLY_EXPLICIT' | 'HARM_CATEGORY_DANGEROUS_CONTENT' | 'HARM_CATEGORY_CIVIC_INTEGRITY'
  probability?: 'HARM_PROBABILITY_UNSPECIFIED' | 'NEGLIGIBLE' | 'LOW' | 'MEDIUM' | 'HIGH'
  blocked?: boolean
}