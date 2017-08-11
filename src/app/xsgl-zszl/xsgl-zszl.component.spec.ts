import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglZszlComponent } from './xsgl-zszl.component';

describe('XsglZszlComponent', () => {
  let component: XsglZszlComponent;
  let fixture: ComponentFixture<XsglZszlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglZszlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglZszlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
