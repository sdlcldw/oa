import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmkqjlComponent } from './bmkqjl.component';

describe('BmkqjlComponent', () => {
  let component: BmkqjlComponent;
  let fixture: ComponentFixture<BmkqjlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmkqjlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmkqjlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
