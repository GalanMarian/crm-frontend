import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import {VolunteerApiService} from "../services/volunteer-api.service";
import {VolunteerDataFromCnp} from "../modules/create-account/models/volunteer/VolunteerDataFromCNP";
import {CNPError} from "../modules/create-account/models/errors/CNPError";


export class UniqueCNPValidator {
  static cnpValidator(
   volunteerApiService : VolunteerApiService,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return volunteerApiService
        .getCNPValidity(control.value)
        .pipe(map((result: VolunteerDataFromCnp | CNPError) => (result ? { CNPExists: result } : null)));
    };
  }
}
