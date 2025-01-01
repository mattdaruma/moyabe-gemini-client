import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AppConfigService } from '../services/app-config/app-config.service';
import { GeminiApiService } from '../services/gemini-api/gemini-api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-key',
  standalone: true,
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, RouterModule],
  templateUrl: './api-key.component.html',
  styleUrl: './api-key.component.scss'
})
export class ApiKeyComponent implements OnDestroy {
  apiKeyInput = new FormControl('')
  private validKey$: Subscription | null = null
  constructor(public api: GeminiApiService, public config: AppConfigService, private router: Router){
    this.validKey$ = this.api.ValidKey$.subscribe(valid => {
      if(valid) this.router.navigate(['/', 'list', 'models'])
    })
  }
  checkKey(){
    this.api.setApiKey(this.apiKeyInput.value!)
  }
  ngOnDestroy(): void {
    this.validKey$?.unsubscribe()
  }
}
