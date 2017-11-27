import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsszFjComponent } from './sssz-fj.component';

describe('SsszFjComponent', () => {
  let component: SsszFjComponent;
  let fixture: ComponentFixture<SsszFjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsszFjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsszFjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
