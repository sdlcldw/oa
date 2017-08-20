import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GzcxComponent } from './gzcx.component';

describe('GzcxComponent', () => {
  let component: GzcxComponent;
  let fixture: ComponentFixture<GzcxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GzcxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GzcxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
