import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XkjgComponent } from './xkjg.component';

describe('XkjgComponent', () => {
  let component: XkjgComponent;
  let fixture: ComponentFixture<XkjgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XkjgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XkjgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
