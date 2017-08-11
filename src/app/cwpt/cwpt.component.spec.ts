import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptComponent } from './cwpt.component';

describe('CwptComponent', () => {
  let component: CwptComponent;
  let fixture: ComponentFixture<CwptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
