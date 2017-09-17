import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcztComponent } from './zczt.component';

describe('ZcztComponent', () => {
  let component: ZcztComponent;
  let fixture: ComponentFixture<ZcztComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcztComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcztComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
