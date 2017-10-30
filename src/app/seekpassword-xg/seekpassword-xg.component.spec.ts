import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekpasswordXgComponent } from './seekpassword-xg.component';

describe('SeekpasswordXgComponent', () => {
  let component: SeekpasswordXgComponent;
  let fixture: ComponentFixture<SeekpasswordXgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekpasswordXgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekpasswordXgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
