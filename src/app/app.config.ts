import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AppConfigService } from './services/app-config/app-config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CLIPBOARD_OPTIONS, provideMarkdown} from 'ngx-markdown'

import { MarkdownClipboardButtonComponent } from './shared/markdown-code-button-bar/markdown-clipboard-button.component'
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfigService) => () => config.Load(),
      multi: true,
      deps: [AppConfigService, HttpClient]
    },
    importProvidersFrom(BrowserAnimationsModule),
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: MarkdownClipboardButtonComponent
        }
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
};
