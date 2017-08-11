import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcglComponent } from './zcgl.component';

describe('ZcglComponent', () => {
  let component: ZcglComponent;
  let fixture: ComponentFixture<ZcglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
