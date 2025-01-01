import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  data!: AppConfig
  constructor(private http: HttpClient) { }
  Load(){
    return new Promise((resolve, reject) => {
      this.http.get<AppConfig>('/assets/gemini-app-config.json').subscribe(
        response => {
          this.data = response
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }
}
