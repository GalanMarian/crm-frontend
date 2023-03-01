import {Component, EventEmitter, Output} from '@angular/core';
import {CreateAccountSteps} from "../../../models/steps/CreateAccountSteps";
import {VolunteerInfo} from "../../../models/volunteer/VolunteerInfo";
import {VolunteerProfile} from "../../../models/volunteer/VolunteerProfile";
import {VolunteerCredentials} from "../../../models/volunteer/VolunteerCredentials"
import {Volunteer} from "../../../models/volunteer/Volunteer";
import {VolunteerDataFromCnp} from "../../../models/volunteer/VolunteerDataFromCNP";

@Component({
  selector: 'app-volunteer-create-account',
  templateUrl: './volunteer-create-account.component.html',
  styleUrls: ['./volunteer-create-account.component.scss']
})
export class VolunteerCreateAccountComponent {
  @Output() emitImageSrc = new EventEmitter<string>();
  volunteerCredentials : VolunteerCredentials | undefined ;
  currentStep: CreateAccountSteps = CreateAccountSteps.First;

  volunteer!: Volunteer;
  volunteerInfo!: VolunteerInfo;

  ngOnInit(): void {
    setTimeout(() => this.emitImageSrc.emit("assets/images/account-credentials.jpg"),0);
  }

  setVolunteerCredentials(data: VolunteerCredentials) {
    this.currentStep = CreateAccountSteps.Second;
    this.volunteerCredentials = data;
    const { email, cnp, cnpData, password } = data;
    this.volunteerCredentials.cnpData = { ...cnpData };
    this.volunteer = { ...this.volunteer, ...this.volunteerCredentials, email, cnp, ...cnpData, password };
    console.log(this.volunteerCredentials);
  }

  setVolunteerPersonalInfo(data: VolunteerInfo) {
    this.volunteerInfo = data;
    const { firstName, lastName, dateOfBirth, gender, region, city, phoneNumber } = data;
    this.volunteer = {
      ...this.volunteer,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      region,
      city,
      phoneNumber,
    };
    this.currentStep = CreateAccountSteps.Third;
  }

  setVolunteerProfileData(data: VolunteerProfile) {
    this.currentStep = CreateAccountSteps.Fourth;
  }

  getVolunteerDataFromCnp(): VolunteerDataFromCnp {
    const { dateOfBirth, gender } = this.volunteer;
    return { dateOfBirth, gender};
  }

  goToAccountCredentialsStep(): void {
    this.currentStep = CreateAccountSteps.First;
  }
}
