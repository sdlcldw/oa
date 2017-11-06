import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmwhComponent } from './bmwh.component';

describe('BmwhComponent', () => {
  let component: BmwhComponent;
  let fixture: ComponentFixture<BmwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
