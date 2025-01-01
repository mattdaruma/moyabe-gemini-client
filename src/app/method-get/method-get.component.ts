import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GeminiApiService } from '../services/gemini-api/gemini-api.service';
import { first } from 'rxjs';
import { AppConfigService } from '../services/app-config/app-config.service';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ConfigResource } from '../services/app-config/app-config.interface';
import { NgxJsonViewerModule } from 'ngx-json-viewer'

@Component({
  selector: 'app-method-get',
  standalone: true,
  imports: [RouterModule, CommonModule, ClarityModule, NgxJsonViewerModule],
  templateUrl: './method-get.component.html',
  styleUrl: './method-get.component.scss'
})
export class MethodGetComponent {
  viewData?: any = undefined
  errorMessage?: string = undefined
  resource?: ConfigResource = undefined
  constructor(private route: ActivatedRoute, private api: GeminiApiService, private config: AppConfigService){
    this.route.params.subscribe(params => {
      this.viewData = undefined
      this.errorMessage = undefined
      this.resource = undefined
      let getPath = `${params['resourceName']}/${params['resourceId']}`
      this.api.get(getPath).pipe(first()).subscribe(res => {
        this.viewData = res
        this.resource = this.config.data.resources.find(r => r.name == params['resourceName'])!
        console.warn('viewData', this.viewData)
        console.warn('RESOURCE', this.resource)
      }, err => {
        this.errorMessage = JSON.stringify(err, null, 2)
      })
    })
  }
}
