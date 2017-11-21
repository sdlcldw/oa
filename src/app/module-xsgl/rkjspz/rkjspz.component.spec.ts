import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkjspzComponent } from './rkjspz.component';

describe('RkjspzComponent', () => {
  let component: RkjspzComponent;
  let fixture: ComponentFixture<RkjspzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkjspzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkjspzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
