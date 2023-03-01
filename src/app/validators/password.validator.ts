import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const regex: RegExp = /\d/;

  if (control.value && regex.test(control.value)) {
    return null;
  }

  return { invalidPasswordFormat: true };
};
