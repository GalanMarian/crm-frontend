import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoCreateAccountComponent } from './ngo-create-account.component';

describe('NgoCreateAccountComponent', () => {
  let component: NgoCreateAccountComponent;
  let fixture: ComponentFixture<NgoCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoCreateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
