import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';

const apiKeyCacheKey = 'lastGoodKey'

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {
  ValidKey$ = new BehaviorSubject<boolean>(false)
  Models$ = new BehaviorSubject<any[]>([])

  private geminiApiKey: string | null = null

  constructor(private http: HttpClient, private config: AppConfigService) { 
    let lastGoodKey = localStorage.getItem(apiKeyCacheKey)
    if(lastGoodKey){
      this.geminiApiKey = lastGoodKey
      this.ValidKey$.next(true)
    }
  }
  private get geminiBase(){
    return `${this.config.data.serviceEmdpoint}${this.config.data.versionName}/`
  }
  private get geminiKeyParam(){
    return `?key=${this.geminiApiKey}`
  }

  setApiKey(key: string ){
    this.geminiApiKey = key
    this.checkKey()
  }

  checkKey(){
    this.http.get<any>(`${this.geminiBase}models/${this.geminiKeyParam}`).subscribe({
      next: res => {
        this.Models$.next(res.models)
        localStorage.setItem(apiKeyCacheKey, this.geminiApiKey!)
        this.ValidKey$.next(true)
      }, error: err => {
        console.error('Error Fetching Models, Probably Invalid Key', err)
        this.ValidKey$.next(false)
      }, complete: () => {}
    })
  }

  clearApiKey(){
    this.geminiApiKey = null
    localStorage.removeItem(apiKeyCacheKey)
    this.ValidKey$.next(false)
  }

  //common
  create(){}
  delete(){}
  get(path: string){
    return this.http.get<any>(`${this.geminiBase}${path}${this.geminiKeyParam}`)
  }
  post(path: string, body: any){
    return this.http.post<any>(`${this.geminiBase}${path}${this.geminiKeyParam}`, body)
  }
  patch(){}
  query(){}

  //chunks
  batchCreate(){}
  batchDelete(){}
  batchUpdate(){}

  //media
  upload(){}

  //models
  batchEmbedContents(){}
  batchEmbedText(){}
  countMessageTokens(){}
  countTextTokens(){}
  countTokens(){}
  embedContent(){}
  embedText(){}
  generateAnswer(){}
  generateContent(){}
  generateMessage(){}
  generateText(){}
  streamGenerateContent(){}
  transferOwnership(){}
}
