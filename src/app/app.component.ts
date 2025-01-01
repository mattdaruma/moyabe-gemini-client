import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular'
import { AppConfigService } from './services/app-config/app-config.service';
import { GeminiApiService } from './services/gemini-api/gemini-api.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gemini-app';
  apiKeyInput = new FormControl('')

  constructor(public config: AppConfigService, public api: GeminiApiService){
  }

  checkKey(){
    this.api.setApiKey(this.apiKeyInput.value!)
  }
}
