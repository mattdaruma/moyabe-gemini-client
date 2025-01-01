import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { first, Subscription } from 'rxjs';
import { GeminiApiService } from '../services/gemini-api/gemini-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ClarityModule],
  templateUrl: './method-list.component.html',
  styleUrl: './method-list.component.scss'
})
export class MethodListComponent implements OnDestroy {
  resourceName: string | null = null
  columns: string[] | null = null
  data: any[] | null = null
  errorMessage: string | null = null
  private paramSubscription$: Subscription | null = null
  constructor(private route: ActivatedRoute, private api: GeminiApiService){
    this.paramSubscription$ = this.route.params.subscribe(params => {
      this.columns = null
      this.data = null
      this.resourceName = params['resourceName']
      if(this.resourceName){
        let listPath = `${params['resourceName']}`
        this.api.list(listPath).pipe(first()).subscribe(list => {
          let columnBuilder: string[] = []
          for(let lindex in list[this.resourceName!]){
            for(let index in list[this.resourceName!][lindex]){
              if(!columnBuilder.includes(index)) columnBuilder.push(index)
            }
          }
          this.columns = columnBuilder
          console.warn('list pull complete', list)
          if(list[this.resourceName!]) this.data = list[this.resourceName!]
          else this.data = [] 
        }, err => {
          console.warn('error pulling list')
          this.errorMessage = JSON.stringify(err, null, 2)
        })
      }else{
        this.errorMessage = 'No resource name provided.'
      }
    })
  }
  ngOnDestroy(): void {
    this.paramSubscription$?.unsubscribe()
  }
}
