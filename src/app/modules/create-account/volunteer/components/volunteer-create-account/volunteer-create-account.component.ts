import {Component, EventEmitter, Output} from '@angular/core';
import {CreateAccountSteps} from "../../../models/steps/CreateAccountSteps";
import {VolunteerInfo} from "../../../models/volunteer/VolunteerInfo";
import {VolunteerProfile} from "../../../models/volunteer/VolunteerProfile";
import {VolunteerCredentials} from "../../../models/volunteer/VolunteerCredentials"

@Component({
  selector: 'app-volunteer-create-account',
  templateUrl: './volunteer-create-account.component.html',
  styleUrls: ['./volunteer-create-account.component.scss']
})
export class VolunteerCreateAccountComponent {
  @Output() emitImageSrc = new EventEmitter<string>();
  currentStep: CreateAccountSteps = CreateAccountSteps.Second;

  ngAfterViewInit(): void {
    setTimeout(() => this.emitImageSrc.emit("assets/images/account-credentials.jpg"),0);
  }

  setVolunteerCredentials(data: VolunteerCredentials) {
    this.currentStep = CreateAccountSteps.Second;
  }

  setVolunteerPersonalInfo(data: VolunteerInfo) {
    this.currentStep = CreateAccountSteps.Third;
  }

  setVolunteerProfileData(data: VolunteerProfile) {
    this.currentStep = CreateAccountSteps.Fourth;
  }




}
