import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsglComponent } from './jsgl.component';

describe('JsglComponent', () => {
  let component: JsglComponent;
  let fixture: ComponentFixture<JsglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
