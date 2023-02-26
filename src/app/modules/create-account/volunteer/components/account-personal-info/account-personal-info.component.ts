import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Region} from "../../../models/Region";
import {City} from "../../../models/City";
import {VolunteerDataFromCnp} from "../../../models/volunteer/VolunteerDataFromCNP";

@Component({
  selector: 'app-account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent {

  submitted: boolean = false;
  cities: City[] = [];
  regions: Region[] = [];
  volunteerData : VolunteerDataFromCnp = {
    firstName: "Galan",
    lastName : "Silviu Marian",
    gender : "male",
    dateOfBirth : "18/08/2001"
  };
  allRegionsData: Region[] = [];
  /*clickRegion: boolean;
  clickCity: boolean;
  selectedRegion: Region | null;
  selectedCity: City | null;
  regions$: Observable<Region[]>;*/

  formGroup: FormGroup = this.fb.group(
    {
      region: new FormControl('', [Validators.required]),
      city: new FormControl({ value: '', disabled: true }, [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    },
    {
      updateOn: 'submit',
    },
  );

  formForFilters = this.fb.group({
    selectedRegion: [''],
    selectedCity: [''],
  });

  constructor(
    /*private readonly createPatientAccountService: CreatePatientAccountApiService,*/
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    /*let auxRegions: Region[] = [];
    this.regions$ = this.createPatientAccountService.getAllRegions();
    const tempRegions = await lastValueFrom(this.regions$);

    tempRegions.forEach((region) => {
      auxRegions.push(region);
    });

    this.regions = auxRegions;
    this.allRegionsData = auxRegions;*/

    /*if (this.patientInfo) {
      tempRegions.forEach((region) => {
        if (region.name === this.patientInfo.region) {
          if (region) this.cities = region.cities;
          const tempCity: City | undefined = this.cities?.find(
            (city) => city.name === this.patientInfo.city,
          );
          this.formGroup.controls['city'].enable();
          this.formGroup.setValue({
            region: region.name,
            city: tempCity?.name,
            phoneNumber: this.patientInfo.phoneNumber.substring(3),
          });
        }
      });
    }*/
  }

  onFocusRegion() {
    /*if (!this.clickRegion) {
      this.dropdownRegion.show();
    }*/
  }

  onClickRegion() {
    /*this.clickRegion = true;
    setTimeout(() => {
      this.clickRegion = false;
    });*/
  }

  onFocusCity() {
    /*if (!this.clickCity) {
      this.dropdownCity.show();
    }*/
  }

  onClickCity() {
   /* this.clickCity = true;
    setTimeout(() => {
      this.clickCity = false;
    });*/
  }

  getRegions(): any {
    /*return this.regions$;*/
  }

  filterRegions() {
    /*this.regions = this.allRegionsData.filter((region) =>
      region.name
        .toLowerCase()
        .startsWith(this.formForFilters.controls.selectedRegion.value?.toLowerCase() ?? ''),
    );

    let currentPattern = this.formForFilters.controls.selectedRegion.value;
    if (this.regions.filter((region) => region.name === currentPattern).length === 0) {
      this.selectedRegion = null;

      this.clearCities();
    }*/
  }

  filterCities() {
    /*this.cities =
      this.selectedRegion?.cities.filter((city) =>
        city.name
          .toLowerCase()
          .startsWith(this.formForFilters.controls.selectedCity.value?.toLowerCase() ?? ''),
      ) ?? [];

    let currentPattern = this.formForFilters.controls.selectedCity.value;
    if (this.cities.filter((city) => city.name === currentPattern).length === 0) {
      this.selectedCity = null;
    }*/
  }

  selectRegion($event: any) {
    /*this.filterRegions();
    if (
      $event.originalEvent.inputType !== 'insertText' &&
      $event.originalEvent.inputType !== 'deleteContentBackward'
    ) {
      this.selectedRegion = this.regions.filter((region) => region.name === $event.value)[0];
      this.regions = this.allRegionsData;
      this.cities = this.selectedRegion.cities;
      this.selectedCity = null;
      this.formForFilters.controls.selectedCity.patchValue('');
      this.formGroup.controls['city'].patchValue('');
      this.formGroup.controls['city'].enable();
    }*/
  }
  selectCity($event: any) {
    /*this.filterCities();
    if (
      $event.originalEvent.inputType !== 'insertText' &&
      $event.originalEvent.inputType !== 'deleteContentBackward'
    ) {
      this.selectedCity =
        this.selectedRegion?.cities.filter((city) => city.name === $event.value)[0] ?? null;
      this.cities = this.selectedRegion?.cities ?? [];
      this.formGroup.controls['city'].enable();
    }*/
  }

  clearCities() {
    this.formGroup.controls['city'].disable();
    this.cities = [];
    this.formGroup.controls['city'].patchValue('');
    this.formForFilters.controls.selectedCity.patchValue('');
  }

  onSubmit(): void {
    /*this.formGroup.controls['region'].patchValue(this.formForFilters.controls.selectedRegion.value);
    this.formGroup.controls['city'].patchValue(this.formForFilters.controls.selectedCity.value);
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const formFields = this.formGroup.controls;
    this.patientInfo = {
      firstName: this.patientData.firstName,
      lastName: this.patientData.lastName,
      dateOfBirth: this.patientData.dateOfBirth,
      gender: this.patientData.gender,
      region: formFields['region'].value,
      city: formFields['city'].value,
      phoneNumber: '+40' + formFields['phoneNumber'].value,
    };
    this.emitPatientInfo.emit(this.patientInfo);*/
  }

  stepBack() {
   /* this.goToAccountCredentialsStep.emit();*/
  }
}
