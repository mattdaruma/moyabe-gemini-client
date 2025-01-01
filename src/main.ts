import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { addTextIcon, chatBubbleIcon, checkCircleIcon, checkIcon, ClarityIcons, clipboardIcon, cpuIcon, detailExpandIcon, filterIcon, keyIcon, refreshIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon)
ClarityIcons.addIcons(cpuIcon)
ClarityIcons.addIcons(keyIcon)
ClarityIcons.addIcons(detailExpandIcon)
ClarityIcons.addIcons(filterIcon)
ClarityIcons.addIcons(refreshIcon)
ClarityIcons.addIcons(chatBubbleIcon)
ClarityIcons.addIcons(addTextIcon)
ClarityIcons.addIcons(clipboardIcon)
ClarityIcons.addIcons(checkCircleIcon)
ClarityIcons.addIcons(checkIcon)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
