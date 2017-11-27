import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsszCwComponent } from './sssz-cw.component';

describe('SsszCwComponent', () => {
  let component: SsszCwComponent;
  let fixture: ComponentFixture<SsszCwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsszCwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsszCwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
