import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsglCjxsTxxxComponent } from './xsgl-cjxs-txxx.component';

describe('XsglCjxsTxxxComponent', () => {
  let component: XsglCjxsTxxxComponent;
  let fixture: ComponentFixture<XsglCjxsTxxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsglCjxsTxxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsglCjxsTxxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
