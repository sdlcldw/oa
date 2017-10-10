import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpqxComponent } from './fpqx.component';

describe('FpqxComponent', () => {
  let component: FpqxComponent;
  let fixture: ComponentFixture<FpqxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpqxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpqxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
