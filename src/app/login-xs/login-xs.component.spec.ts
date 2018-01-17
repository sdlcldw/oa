import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginXsComponent } from './login-xs.component';

describe('LoginXsComponent', () => {
  let component: LoginXsComponent;
  let fixture: ComponentFixture<LoginXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
