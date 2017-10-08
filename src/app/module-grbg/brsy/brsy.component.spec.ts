import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrsyComponent } from './brsy.component';

describe('BrsyComponent', () => {
  let component: BrsyComponent;
  let fixture: ComponentFixture<BrsyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrsyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
