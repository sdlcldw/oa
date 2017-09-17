import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DljlComponent } from './dljl.component';

describe('DljlComponent', () => {
  let component: DljlComponent;
  let fixture: ComponentFixture<DljlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DljlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DljlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
