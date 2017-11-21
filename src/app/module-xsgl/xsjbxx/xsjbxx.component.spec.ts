import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsjbxxComponent } from './xsjbxx.component';

describe('XsjbxxComponent', () => {
  let component: XsjbxxComponent;
  let fixture: ComponentFixture<XsjbxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsjbxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsjbxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
