import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptJfzlComponent } from './cwpt-jfzl.component';

describe('CwptJfzlComponent', () => {
  let component: CwptJfzlComponent;
  let fixture: ComponentFixture<CwptJfzlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptJfzlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptJfzlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
