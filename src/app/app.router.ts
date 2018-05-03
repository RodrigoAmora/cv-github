import { Routes, RouterModule } from '@angular/router'

//COmponents
import { AppComponent } from './app.component';

export const routes: Routes = [
      {
        path: '',
        component: AppComponent
      },
];

export const RoutingModule = RouterModule.forRoot(routes);