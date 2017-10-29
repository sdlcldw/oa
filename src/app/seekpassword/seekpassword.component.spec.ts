import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekpasswordComponent } from './seekpassword.component';

describe('SeekpasswordComponent', () => {
  let component: SeekpasswordComponent;
  let fixture: ComponentFixture<SeekpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
