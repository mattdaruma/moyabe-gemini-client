import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeminiApiService } from '../../services/gemini-api/gemini-api.service';
import { BehaviorSubject, first, ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedErrorComponent } from '../../shared/shared-error/shared-error.component';
import { SharedLoadingComponent } from '../../shared/shared-loading/shared-loading.component';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-view-model-details',
  standalone: true,
  imports: [CommonModule, ClarityModule, SharedLoadingComponent, SharedErrorComponent],
  templateUrl: './view-model-details.component.html',
  styleUrl: './view-model-details.component.scss'
})
export class ViewModelDetailsComponent {
  loading$ = new BehaviorSubject<boolean>(true)
  model$ = new ReplaySubject<any>(1)
  error$ = new ReplaySubject<any>(1)
  constructor(private route: ActivatedRoute, private api: GeminiApiService){
    this.route.params.subscribe(params => {
      this.api.get(`models/${params['modelId']}`).pipe(first()).subscribe(model => {
          console.warn('MODEL DETAILS', model)
            this.model$.next(model)
            this.loading$.next(false)
          }, err => {
            this.error$.next(err)
            this.loading$.next(false)
          })
    })
  }
}
