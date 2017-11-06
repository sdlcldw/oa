import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZwwhComponent } from './zwwh.component';

describe('ZwwhComponent', () => {
  let component: ZwwhComponent;
  let fixture: ComponentFixture<ZwwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZwwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZwwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
