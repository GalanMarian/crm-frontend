import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAccountComponent} from "./container/create-account/create-account.component";

const routes: Routes = [
  {
    path: ':ngo-id/volunteer',
    component: CreateAccountComponent
  },
  {
    path: 'ngo',
    component: CreateAccountComponent
  },
  {
    path: '',
    component: CreateAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAccountRoutingModule { }
