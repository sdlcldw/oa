import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglWdzsComponent } from './xsgl-wdzs.component';

describe('XsglWdzsComponent', () => {
  let component: XsglWdzsComponent;
  let fixture: ComponentFixture<XsglWdzsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglWdzsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglWdzsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
