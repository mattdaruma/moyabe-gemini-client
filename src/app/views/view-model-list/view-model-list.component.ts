import { Component } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { GeminiApiService } from '../../services/gemini-api/gemini-api.service';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SharedLoadingComponent } from '../../shared/shared-loading/shared-loading.component';
import { SharedErrorComponent } from '../../shared/shared-error/shared-error.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const modelsCacheKey = 'modelListCache'
const modelsCacheDateKey = 'modelListCacheDate'

@Component({
  selector: 'app-view-model-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ClarityModule, SharedLoadingComponent, SharedErrorComponent],
  templateUrl: './view-model-list.component.html',
  styleUrl: './view-model-list.component.scss'
})
export class ViewModelListComponent {
  Models$ = new BehaviorSubject<any[] | null>(null)
  Loading$ = new BehaviorSubject<boolean>(true)
  Error$ = new BehaviorSubject<any>(null)
  LastCache$ = new BehaviorSubject<Date | null>(null)

  Filter = new FormControl('')

  private apiData: any[] | null = null

  constructor(private api: GeminiApiService){
    let modelCacheString = localStorage.getItem(modelsCacheKey)
    let modelCacheDateString = localStorage.getItem(modelsCacheDateKey)
    if(modelCacheString && modelCacheDateString){
      let modelsCache = JSON.parse(modelCacheString)
      this.apiData = structuredClone(modelsCache)
      this.LastCache$.next(new Date(JSON.parse(modelCacheDateString)))
      this.Models$.next(modelsCache)
      this.Loading$.next(false)
    }else{
      this.getModels()
    }
    this.Filter.valueChanges.subscribe(val => this.filter(val))
  }
  getModels(){
    this.Loading$.next(true)
    this.Error$.next(null)
    return this.api.get('models').pipe(first()).subscribe({
      next: (data)=>{
        localStorage.setItem(modelsCacheKey, JSON.stringify(data.models))
        let cacheDate = new Date()
        this.LastCache$.next(cacheDate)
        localStorage.setItem(modelsCacheDateKey, JSON.stringify(cacheDate.getTime()))
        this.apiData = structuredClone(data.models)
        this.Models$.next(data.models)
      },
      error: (err)=>{
        this.Loading$.next(false)
        this.Error$.next(err)
      },
      complete: ()=>{
        this.Loading$.next(false)
      }
    })
  }
  filter(val: string | null){
    if(val && val.trim && val.trim().length > 0){
      let copy = structuredClone(this.apiData ?? [])
      let filtered =copy.filter(dat => JSON.stringify(dat).toLowerCase().includes(val.toLowerCase())) ?? []
      this.Models$.next(filtered)
    }else{
      this.Models$.next(this.apiData)
    }
  }
}
