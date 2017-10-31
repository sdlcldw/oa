import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrzlComponent } from './grzl.component';

describe('GrzlComponent', () => {
  let component: GrzlComponent;
  let fixture: ComponentFixture<GrzlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrzlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrzlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
