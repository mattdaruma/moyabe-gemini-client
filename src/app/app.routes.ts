import { Routes } from '@angular/router';
import { ViewModelDetailsComponent } from './views/view-model-details/view-model-details.component';
import { ViewHomeComponent } from './views/view-home/view-home.component';
import { ViewModelListComponent } from './views/view-model-list/view-model-list.component';
import { ViewNotFoundComponent } from './views/view-not-found/view-not-found.component';
import { ViewModelChatComponent } from './views/view-model-chat/view-model-chat.component';

export const routes: Routes = [
    {
        path: '',
        component: ViewHomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'model/list',
        component: ViewModelListComponent
    },
    {
        path: 'model/view/:modelId',
        component: ViewModelDetailsComponent
    },
    {
        path: 'model/chat/:modelId',
        component: ViewModelChatComponent
    },
    {
        path: '**',
        component: ViewNotFoundComponent
    }
];
