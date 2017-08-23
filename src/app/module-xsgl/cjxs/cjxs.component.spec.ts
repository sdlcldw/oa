import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CjxsComponent } from './cjxs.component';

describe('CjxsComponent', () => {
  let component: CjxsComponent;
  let fixture: ComponentFixture<CjxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CjxsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CjxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
