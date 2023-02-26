import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './container/create-account/create-account.component';
import {
  VolunteerCreateAccountComponent
} from "./volunteer/components/volunteer-create-account/volunteer-create-account.component";
import {NgoCreateAccountComponent} from "./ngo/components/ngo-create-account/ngo-create-account.component";
import { AccountCredentialsComponent } from './volunteer/components/account-credentials/account-credentials.component';
import { AccountPersonalInfoComponent } from "./volunteer/components/account-personal-info/account-personal-info.component"
import { AccountProfileDataComponent } from './volunteer/components/account-profile-data/account-profile-data.component';
import { AccountVerifyEmailComponent } from './volunteer/components/account-verify-email/account-verify-email.component';
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {InputMaskModule} from "primeng/inputmask";




@NgModule({
  declarations: [
    CreateAccountComponent,
    VolunteerCreateAccountComponent,
    NgoCreateAccountComponent,
    AccountCredentialsComponent,
    AccountPersonalInfoComponent,
    AccountProfileDataComponent,
    AccountVerifyEmailComponent
  ],
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule
  ]
})
export class CreateAccountModule { }
