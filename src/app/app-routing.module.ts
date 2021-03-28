import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeyondCodingComponent } from './beyond-coding';
import { HomeComponent } from './home';
import { ProjectsComponent } from './projects';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'beyond-coding', component: BeyondCodingComponent},

  // otherwise, redirect to home
  {path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
