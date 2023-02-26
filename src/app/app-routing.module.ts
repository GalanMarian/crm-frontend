import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TermsOfServiceComponent} from "./modules/legal/terms-of-service/terms-of-service.component";
import {PrivacyPolicyComponent} from "./modules/legal/privacy-policy/privacy-policy.component";

const routes: Routes = [
  {
    path: 'create-account',
    loadChildren : () =>
      import('./modules/create-account/create-account.module').then((m) => m.CreateAccountModule)
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
