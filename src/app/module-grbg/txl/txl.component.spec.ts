import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxlComponent } from './txl.component';

describe('TxlComponent', () => {
  let component: TxlComponent;
  let fixture: ComponentFixture<TxlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
