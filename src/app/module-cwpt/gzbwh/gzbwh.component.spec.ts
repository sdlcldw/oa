import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GzbwhComponent } from './gzbwh.component';

describe('GzbwhComponent', () => {
  let component: GzbwhComponent;
  let fixture: ComponentFixture<GzbwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GzbwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GzbwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
