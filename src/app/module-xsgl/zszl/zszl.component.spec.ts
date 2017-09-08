import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZszlComponent } from './zszl.component';

describe('ZszlComponent', () => {
  let component: ZszlComponent;
  let fixture: ComponentFixture<ZszlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZszlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZszlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
