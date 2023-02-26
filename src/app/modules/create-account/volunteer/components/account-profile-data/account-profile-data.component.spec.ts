import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileDataComponent } from './account-profile-data.component';

describe('AccountProfileDataComponent', () => {
  let component: AccountProfileDataComponent;
  let fixture: ComponentFixture<AccountProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfileDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
