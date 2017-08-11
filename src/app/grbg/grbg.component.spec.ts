import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbgComponent } from './grbg.component';

describe('GrbgComponent', () => {
  let component: GrbgComponent;
  let fixture: ComponentFixture<GrbgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
