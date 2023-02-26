import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerCreateAccountComponent } from './volunteer-create-account.component';

describe('VolunteerCreateAccountComponent', () => {
  let component: VolunteerCreateAccountComponent;
  let fixture: ComponentFixture<VolunteerCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerCreateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
