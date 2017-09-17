import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZclbComponent } from './zclb.component';

describe('ZclbComponent', () => {
  let component: ZclbComponent;
  let fixture: ComponentFixture<ZclbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZclbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZclbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
