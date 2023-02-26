import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVerifyEmailComponent } from './account-verify-email.component';

describe('AccountVerifyEmailComponent', () => {
  let component: AccountVerifyEmailComponent;
  let fixture: ComponentFixture<AccountVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountVerifyEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
