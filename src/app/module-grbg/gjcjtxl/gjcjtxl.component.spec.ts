import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjcjtxlComponent } from './gjcjtxl.component';

describe('GjcjtxlComponent', () => {
  let component: GjcjtxlComponent;
  let fixture: ComponentFixture<GjcjtxlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjcjtxlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjcjtxlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
