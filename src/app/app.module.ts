import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ProjectsComponent } from './projects';
import { BeyondCodingComponent } from './beyond-coding';
import { ProjectsService } from './projects/projects.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    BeyondCodingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
