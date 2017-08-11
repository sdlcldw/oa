import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptCjjfComponent } from './cwpt-cjjf.component';

describe('CwptCjjfComponent', () => {
  let component: CwptCjjfComponent;
  let fixture: ComponentFixture<CwptCjjfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptCjjfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptCjjfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
