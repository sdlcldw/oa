import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CjkcComponent } from './cjkc.component';

describe('CjkcComponent', () => {
  let component: CjkcComponent;
  let fixture: ComponentFixture<CjkcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CjkcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CjkcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
