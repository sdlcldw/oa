import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XxshComponent } from './xxsh.component';

describe('XxshComponent', () => {
  let component: XxshComponent;
  let fixture: ComponentFixture<XxshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XxshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
