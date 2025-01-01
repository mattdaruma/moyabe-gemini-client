import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { GeminiApiService } from '../services/gemini-api/gemini-api.service';
import { AppConfigService } from '../services/app-config/app-config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-setup',
  standalone: true,
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  templateUrl: './api-setup.component.html',
  styleUrl: './api-setup.component.scss'
})
export class ApiSetupComponent {
  apiKeyInput = new FormControl('')
  constructor(public api: GeminiApiService, public config: AppConfigService){
    this.apiKeyInput.valueChanges.subscribe(val => {
      console.warn('KEY VALUE CHANGED', val)
    })
  }
  checkKey(){
    this.api.setApiKey(this.apiKeyInput.value!)
  }
}
