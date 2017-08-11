import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglComponent } from './xsgl.component';

describe('XsglComponent', () => {
  let component: XsglComponent;
  let fixture: ComponentFixture<XsglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
