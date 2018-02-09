import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XskqComponent } from './xskq.component';

describe('XskqComponent', () => {
  let component: XskqComponent;
  let fixture: ComponentFixture<XskqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XskqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XskqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
