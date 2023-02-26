import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-credentials',
  templateUrl: './account-credentials.component.html',
  styleUrls: ['./account-credentials.component.scss']
})
export class AccountCredentialsComponent {
  touch: { [key: string]: boolean } = {};
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
        //Validators.composeAsync([UniqueEmailValidator.uniqueEmailValidator(this.emailService)]),
      ),
      CNP: new FormControl(
        '',
        [Validators.required, Validators.pattern(/^(\d{13})$/)],

       /* Validators.composeAsync([
          UniqueCNPValidator.cnpValidator(this.createPatientAccountApiService),
        ]),*/
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        //PasswordValidator,
      ]),
      confirmPassword: new FormControl('', Validators.required),
      termsAndConditions: new FormControl(false, Validators.requiredTrue),
    },
    //{ validators: MatchPasswords },
  );

  constructor(
    // private emailService: EmailService,
    // private createPatientAccountApiService: CreatePatientAccountApiService,
  ) {}

  ngOnInit(): void {
    /*if (this.patientCredentials !== undefined) {
      const formFields = this.formGroup.controls;

      formFields['email'].setValue(this.patientCredentials.email);
      formFields['CNP'].setValue(this.patientCredentials.CNP.cnp);
      formFields['password'].setValue(this.patientCredentials.password);
      formFields['confirmPassword'].setValue(this.patientCredentials.password);
    }*/
  }

  getMailErrorMessage(): string {
    const email = this.formGroup.get('email');
    let errorMessage: string = '';

    switch (true) {
      case email?.errors?.hasOwnProperty('pattern'): {
        errorMessage = `Invalid e-mail address. Please enter your e-mail address in format: yourname@example.com`;
        break;
      }
      case email?.errors?.hasOwnProperty('EmailUnique'): {
        errorMessage = `This e-mail address is already associated with an account.`;
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
          //this.cnpData = cnp?.errors?.['CNPExists'];
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
    const confimrPassword = this.formGroup.get('confirmPassword');
    let errorMessage: string = '';

    switch (true) {
      case confimrPassword?.errors?.hasOwnProperty('required'): {
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
      //this.cnpData = cnp?.errors?.['CNPExists'];
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

    /*this.patientCredentials = {
      email: formFields['email'].value,
      CNP: this.cnpData,
      password: formFields['password'].value,
    };

    this.emitPatientCredentials.emit(this.patientCredentials);*/
  }
}
