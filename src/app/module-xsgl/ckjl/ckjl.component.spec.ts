import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkjlComponent } from './ckjl.component';

describe('CkjlComponent', () => {
  let component: CkjlComponent;
  let fixture: ComponentFixture<CkjlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkjlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkjlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
