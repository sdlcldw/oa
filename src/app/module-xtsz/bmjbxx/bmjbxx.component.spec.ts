import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmjbxxComponent } from './bmjbxx.component';

describe('BmjbxxComponent', () => {
  let component: BmjbxxComponent;
  let fixture: ComponentFixture<BmjbxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmjbxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmjbxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
