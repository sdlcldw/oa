import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsszLcComponent } from './sssz-lc.component';

describe('SsszLcComponent', () => {
  let component: SsszLcComponent;
  let fixture: ComponentFixture<SsszLcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsszLcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsszLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
