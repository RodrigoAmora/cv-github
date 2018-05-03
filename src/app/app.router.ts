import { Routes, RouterModule } from '@angular/router'

//COmponents
import { AppComponent } from './app.component';
import { MakeCvGithubComponent } from '../app/make-cv-github/make-cv-github.component';

export const routes: Routes = [
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'make',
        component: MakeCvGithubComponent
      }
];

export const RoutingModule = RouterModule.forRoot(routes);