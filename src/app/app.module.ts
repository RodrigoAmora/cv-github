//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app.router';

//COMPONENTS
import { AppComponent } from './app.component';
import { MakeCvGithubComponent } from './make-cv-github/make-cv-github.component';


@NgModule({
  declarations: [
    AppComponent,
    MakeCvGithubComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
