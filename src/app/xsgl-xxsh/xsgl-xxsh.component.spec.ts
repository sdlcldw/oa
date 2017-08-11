import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglXxshComponent } from './xsgl-xxsh.component';

describe('XsglXxshComponent', () => {
  let component: XsglXxshComponent;
  let fixture: ComponentFixture<XsglXxshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglXxshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglXxshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
