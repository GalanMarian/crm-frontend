import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {lastValueFrom, Observable} from "rxjs";
import {Region} from "../../../models/Region";
import {City} from "../../../models/City";
import {VolunteerDataFromCnp} from "../../../models/volunteer/VolunteerDataFromCNP";
import {VolunteerApiService} from "../../../../../services/volunteer-api.service";
import {Dropdown} from "primeng/dropdown";
import {VolunteerInfo} from "../../../models/volunteer/VolunteerInfo";

@Component({
  selector: 'app-account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent {
  @Output() emitVolunteerInfo = new EventEmitter<VolunteerInfo>();
  @Output() goToAccountCredentialsStep = new EventEmitter();
  @Input() volunteerData!: VolunteerDataFromCnp;
  @Input() volunteerInfo!: VolunteerInfo;
  @ViewChild('dropdownRegion') dropdownRegion!: Dropdown;
  @ViewChild('dropdownCity') dropdownCity!: Dropdown;

  submitted: boolean = false;
  cities: City[] = [];
  regions: Region[] = [];
  allRegionsData: Region[] = [];
  clickRegion!: boolean;
  clickCity!: boolean;
  selectedRegion!: Region | null;
  selectedCity!: City | null;
  regions$!: Observable<Region[]>;

  formGroup: FormGroup = this.fb.group(
    {
      firstName: new FormControl(''),
      lastName : new FormControl(''),
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
    private readonly volunteerApiService : VolunteerApiService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    let auxRegions: Region[] = [];
    this.regions$ = this.volunteerApiService.getAllRegions();
    const tempRegions = await lastValueFrom(this.regions$);

    tempRegions.forEach((region) => {
      auxRegions.push(region);
    });

    this.regions = auxRegions;
    this.allRegionsData = auxRegions;

    if (this.volunteerInfo) {
      tempRegions.forEach((region) => {
        if (region.name === this.volunteerInfo.region) {
          if (region) this.cities = region.cities;
          const tempCity: City | undefined = this.cities?.find(
            (city) => city.name === this.volunteerInfo.city,
          );
          this.formGroup.controls['city'].enable();
          this.formGroup.setValue({
            region: region.name,
            city: tempCity?.name,
            phoneNumber: this.volunteerInfo.phoneNumber.substring(3),
          });
        }
      });
    }
  }

  onFocusRegion() {
    if (!this.clickRegion) {
      this.dropdownRegion.show();
    }
  }

  onClickRegion() {
    this.clickRegion = true;
    setTimeout(() => {
      this.clickRegion = false;
    });
  }

  onFocusCity() {
    if (!this.clickCity) {
      this.dropdownCity.show();
    }
  }

  onClickCity() {
   this.clickCity = true;
    setTimeout(() => {
      this.clickCity = false;
    });
  }

  getRegions(): any {
    return this.regions$;
  }

  filterRegions() {
    this.regions = this.allRegionsData.filter((region) =>
      region.name
        .toLowerCase()
        .startsWith(this.formForFilters.controls.selectedRegion.value?.toLowerCase() ?? ''),
    );

    let currentPattern = this.formForFilters.controls.selectedRegion.value;
    if (this.regions.filter((region) => region.name === currentPattern).length === 0) {
      this.selectedRegion = null;

      this.clearCities();
    }
  }

  filterCities() {
    console.log(this.selectedRegion);
    this.cities =
      this.selectedRegion?.cities.filter((city) =>
        city.name
          .toLowerCase()
          .startsWith(this.formForFilters.controls.selectedCity.value?.toLowerCase() ?? ''),
      ) ?? [];

    let currentPattern = this.formForFilters.controls.selectedCity.value;
    if (this.cities.filter((city) => city.name === currentPattern).length === 0) {
      this.selectedCity = null;
    }
  }

  selectRegion($event: any) {
    this.filterRegions();
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
    }
  }
  selectCity($event: any) {
    this.filterCities();
    if (
      $event.originalEvent.inputType !== 'insertText' &&
      $event.originalEvent.inputType !== 'deleteContentBackward'
    ) {
      this.selectedCity =
        this.selectedRegion?.cities.filter((city) => city.name === $event.value)[0] ?? null;
      this.cities = this.selectedRegion?.cities ?? [];
      this.formGroup.controls['city'].enable();
    }
  }

  clearCities() {
    this.formGroup.controls['city'].disable();
    this.cities = [];
    this.formGroup.controls['city'].patchValue('');
    this.formForFilters.controls.selectedCity.patchValue('');
  }

  onSubmit(): void {
    this.formGroup.controls['region'].patchValue(this.formForFilters.controls.selectedRegion.value);
    this.formGroup.controls['city'].patchValue(this.formForFilters.controls.selectedCity.value);
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const formFields = this.formGroup.controls;
    this.volunteerInfo = {
      firstName : formFields['firstName'].value,
      lastName : formFields['lastName'].value,
      dateOfBirth: this.volunteerData.dateOfBirth,
      gender: this.volunteerData.gender,
      region: formFields['region'].value,
      city: formFields['city'].value,
      phoneNumber: '+40' + formFields['phoneNumber'].value,
    };
    this.emitVolunteerInfo.emit(this.volunteerInfo);
  }

  stepBack() {
    this.goToAccountCredentialsStep.emit();
  }
}
