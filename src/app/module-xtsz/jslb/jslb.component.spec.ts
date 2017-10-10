import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JslbComponent } from './jslb.component';

describe('JslbComponent', () => {
  let component: JslbComponent;
  let fixture: ComponentFixture<JslbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JslbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JslbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
