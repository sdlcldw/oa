import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexXsComponent } from './index-xs.component';

describe('IndexXsComponent', () => {
  let component: IndexXsComponent;
  let fixture: ComponentFixture<IndexXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
