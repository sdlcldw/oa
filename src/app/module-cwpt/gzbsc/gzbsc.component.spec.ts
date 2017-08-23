import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GzbscComponent } from './gzbsc.component';

describe('GzbscComponent', () => {
  let component: GzbscComponent;
  let fixture: ComponentFixture<GzbscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GzbscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GzbscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
