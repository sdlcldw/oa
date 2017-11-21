import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsszComponent } from './sssz.component';

describe('SsszComponent', () => {
  let component: SsszComponent;
  let fixture: ComponentFixture<SsszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
