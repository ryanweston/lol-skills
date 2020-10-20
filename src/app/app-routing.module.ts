import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup';
import { HomeComponent } from './home';
import { StagesComponent } from './stages';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'begin', component: StagesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
