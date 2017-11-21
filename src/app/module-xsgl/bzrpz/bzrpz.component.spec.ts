import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BzrpzComponent } from './bzrpz.component';

describe('BzrpzComponent', () => {
  let component: BzrpzComponent;
  let fixture: ComponentFixture<BzrpzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BzrpzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BzrpzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
