import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup';
import { HomeComponent } from './home';
import { StagesComponent } from './stages';
import { CompletedComponent } from './completed';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'begin', component: StagesComponent },
  { path: 'completed', component: CompletedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
