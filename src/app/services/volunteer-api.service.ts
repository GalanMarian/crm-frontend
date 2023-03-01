import { Injectable } from '@angular/core';
import {environment} from "../../environment/enviroment";
import {HttpClient} from "@angular/common/http";
import { of, catchError, Observable } from 'rxjs';
import {VolunteerDataFromCnp} from "../modules/create-account/models/volunteer/VolunteerDataFromCNP";
import {CNPError} from "../modules/create-account/models/errors/CNPError";
import {Region} from "../modules/create-account/models/Region";

@Injectable({
  providedIn: 'root'
})
export class VolunteerApiService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getCNPValidity(value: string): Observable<VolunteerDataFromCnp | CNPError> {
    return this.http
      .get<VolunteerDataFromCnp>(`${this.apiServerUrl}/api/cnp`, { params: { cnp: value } })
      .pipe(
        catchError((e) => {
          let message: string;
          let cnpError: CNPError;

          if (e.status !== 500) {
            if (e.message === 'CNP must be unique') {
              message = 'This CNP is already associated with an account.';
            } else {
              message = 'Please enter a valid CNP.';
            }

            cnpError = { statusCode: '400', message: message };
          } else {
            message = 'CNP is invalid';
            cnpError = { statusCode: e.statusCode, message: message };
          }

          return of(cnpError);
        }),
      );
  }

  public getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiServerUrl}/api/regions`);
  }
}
