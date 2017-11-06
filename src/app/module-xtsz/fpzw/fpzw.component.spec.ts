import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpzwComponent } from './fpzw.component';

describe('FpzwComponent', () => {
  let component: FpzwComponent;
  let fixture: ComponentFixture<FpzwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpzwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpzwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
