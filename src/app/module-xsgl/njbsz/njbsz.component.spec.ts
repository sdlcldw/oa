import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjbszComponent } from './njbsz.component';

describe('NjbszComponent', () => {
  let component: NjbszComponent;
  let fixture: ComponentFixture<NjbszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjbszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjbszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
