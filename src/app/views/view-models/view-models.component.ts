import { Component } from '@angular/core';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { GeminiApiService } from '../../services/gemini-api/gemini-api.service';
import { BehaviorSubject, first, ReplaySubject } from 'rxjs';
import { SharedLoadingComponent } from '../../shared/shared-loading/shared-loading.component';
import { SharedErrorComponent } from '../../shared/shared-error/shared-error.component';
import { CommonModule } from '@angular/common';
import { SharedTableColumn } from '../../shared/shared-table/shared-table-column.interface';

@Component({
  selector: 'app-view-models',
  standalone: true,
  imports: [CommonModule, SharedTableComponent, SharedLoadingComponent, SharedErrorComponent],
  templateUrl: './view-models.component.html',
  styleUrl: './view-models.component.scss'
})
export class ViewModelsComponent {
  loading$ = new BehaviorSubject<boolean>(true)
  models$ = new ReplaySubject<any[]>(1)
  error$ = new ReplaySubject<any>(1)
  columns = [
    {key: 'name', display: 'Name'},
    {key: 'displayName', display: 'Display Name'},
    {key: 'description', display: 'Description'},
    {key: 'inputTokenLimit', display: 'Input'},
    {key: 'outputTokenLimit', display: 'Output'},
    {key: 'supportedGenerationMethods', display: 'Supported Generators'},
    {key: 'temperature', display: 'Temp'},
    {key: 'topK', display: 'K'},
    {key: 'topP', display: 'P'},
    {key: 'version', display: 'Version'},
  ] as SharedTableColumn[]
  constructor(private api: GeminiApiService){
    this.api.get('models').pipe(first()).subscribe(models => {
      this.models$.next(models.models)
      this.loading$.next(false)
    }, err => {
      this.error$.next(err)
      this.loading$.next(false)
    })
  }
}
