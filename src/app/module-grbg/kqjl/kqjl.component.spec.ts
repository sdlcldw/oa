import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KqjlComponent } from './kqjl.component';

describe('KqjlComponent', () => {
  let component: KqjlComponent;
  let fixture: ComponentFixture<KqjlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KqjlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KqjlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
