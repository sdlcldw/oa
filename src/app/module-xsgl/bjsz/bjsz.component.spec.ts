import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjszComponent } from './bjsz.component';

describe('BjszComponent', () => {
  let component: BjszComponent;
  let fixture: ComponentFixture<BjszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
