import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VolunteerApiService} from "../../../../../services/volunteer-api.service";
import {VolunteerDataFromCnp} from "../../../models/volunteer/VolunteerDataFromCNP";
import {VolunteerCredentials} from "../../../models/volunteer/VolunteerCredentials";
import {UniqueCNPValidator} from "../../../../../validators/unique.cnp.validator";
import {PasswordValidator} from "../../../../../validators/password.validator";
import {MatchPasswords} from "../../../../../validators/match.passwords";

@Component({
  selector: 'app-account-credentials',
  templateUrl: './account-credentials.component.html',
  styleUrls: ['./account-credentials.component.scss']
})
export class AccountCredentialsComponent {
  @Output() emitVolunteerCredentials = new EventEmitter<VolunteerCredentials>();
  @Input() volunteerCredentials: VolunteerCredentials | undefined;
  touch: { [key: string]: boolean } = {};
  cnpData!: VolunteerDataFromCnp;
  validForm: boolean = true;

  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
          ),
        ],
      ),
      CNP: new FormControl(
        '',
        [Validators.required, Validators.pattern(/^(\d{13})$/)],

        Validators.composeAsync([
          UniqueCNPValidator.cnpValidator(this.volunteerApiService),
        ]),
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator,
      ]),
      confirmPassword: new FormControl('', Validators.required),
      termsAndConditions: new FormControl(false, Validators.requiredTrue),
    },
    { validators: MatchPasswords },
  );

  constructor(
    private volunteerApiService: VolunteerApiService,
  ) {}

  ngOnInit(): void {
    if (this.volunteerCredentials !== undefined) {
      const formFields = this.formGroup.controls;

      formFields['email'].setValue(this.volunteerCredentials.email);
      formFields['CNP'].setValue(this.volunteerCredentials.cnp);
      formFields['password'].setValue(this.volunteerCredentials.password);
      formFields['confirmPassword'].setValue(this.volunteerCredentials.password);
    }
  }

  getMailErrorMessage(): string {
    const email = this.formGroup.get('email');
    let errorMessage: string = '';

    switch (true) {
      case email?.errors?.hasOwnProperty('pattern'): {
        errorMessage = `Invalid e-mail address. Please enter your e-mail address in format: yourname@example.com`;
        break;
      }
      case email?.errors?.hasOwnProperty('required'): {
        errorMessage = `Please enter your e-mail address.`;
        break;
      }
    }
    return errorMessage;
  }

  getPasswordErrorMessage(): string {
    const password = this.formGroup.get('password');
    let errorMessage: string = '';

    switch (true) {
      case password?.errors?.hasOwnProperty('required'): {
        errorMessage = `Please enter your password.`;
        break;
      }
      case password?.errors?.hasOwnProperty('minLength'):
      case password?.errors?.hasOwnProperty('invalidPasswordFormat'): {
        errorMessage = `Invalid password format. Password must contain 8 or more characters and contain at least 1 number.`;
        break;
      }
    }

    return errorMessage;
  }

  getCNPErrorMessage(): string {
    const cnp = this.formGroup.get('CNP');
    let errorMessage: string = '';

    switch (true) {
      case this.formGroup.pending: {
        errorMessage = `Invalid CNP format.`;
        break;
      }
      case cnp?.errors?.hasOwnProperty('required'): {
        errorMessage = `Please enter your CNP.`;
        break;
      }
      case cnp?.errors?.hasOwnProperty('pattern'): {
        errorMessage = `Invalid CNP format.`;
        break;
      }
      case cnp?.errors?.hasOwnProperty('CNPExists'): {
        if (cnp?.errors?.['CNPExists'].hasOwnProperty('cnp')) {
          this.cnpData = cnp?.errors?.['CNPExists'];
          this.formGroup.get('CNP')?.setErrors(null);
        }

        errorMessage = cnp?.errors?.['CNPExists'].message;
        break;
      }
    }

    return errorMessage;
  }

  changeInvalidStatus(field: string) {
    if (field === 'password') {
      this.touch['confirmPassword'] = false;
    }

    if (this.touch !== undefined) {
      this.touch[field] = false;
    }
  }

  getConfirmMessageError(): string {
    const confirmPassword = this.formGroup.get('confirmPassword');
    let errorMessage: string = '';

    switch (true) {
      case confirmPassword?.errors?.hasOwnProperty('required'): {
        errorMessage = `Please confirm your password.`;
        break;
      }
      case this.formGroup.errors?.hasOwnProperty('matchPasswords'): {
        errorMessage = `Please make sure your passwords match.`;
        break;
      }
    }

    return errorMessage;
  }

  onSubmit() {
    const cnp = this.formGroup.get('CNP');

    if (cnp?.errors?.['CNPExists']?.hasOwnProperty('cnp')) {
      this.cnpData = cnp?.errors?.['CNPExists'];
      this.formGroup.get('CNP')?.setErrors(null);
    }

    if (this.formGroup.invalid || this.formGroup.pending) {
      this.validForm = false;
      this.touch['confirmPassword'] = true;
      this.touch['password'] = true;
      this.touch['CNP'] = true;
      this.touch['email'] = true;

      return;
    }

    const formFields = this.formGroup.controls;


    this.volunteerCredentials = {
      email: formFields['email'].value,
      cnpData: this.cnpData,
      cnp : formFields['CNP'].value,
      password: formFields['password'].value,
    };

    this.emitVolunteerCredentials.emit(this.volunteerCredentials);
  }
}
