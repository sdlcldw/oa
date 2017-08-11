import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglNanssComponent } from './xsgl-nanss.component';

describe('XsglNanssComponent', () => {
  let component: XsglNanssComponent;
  let fixture: ComponentFixture<XsglNanssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglNanssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglNanssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
