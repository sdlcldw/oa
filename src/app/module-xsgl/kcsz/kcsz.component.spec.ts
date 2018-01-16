import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcszComponent } from './kcsz.component';

describe('KcszComponent', () => {
  let component: KcszComponent;
  let fixture: ComponentFixture<KcszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
