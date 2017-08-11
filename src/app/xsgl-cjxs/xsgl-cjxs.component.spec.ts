import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglCjxsComponent } from './xsgl-cjxs.component';

describe('XsglCjxsComponent', () => {
  let component: XsglCjxsComponent;
  let fixture: ComponentFixture<XsglCjxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglCjxsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglCjxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
