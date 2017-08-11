import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptGzbwhComponent } from './cwpt-gzbwh.component';

describe('CwptGzbwhComponent', () => {
  let component: CwptGzbwhComponent;
  let fixture: ComponentFixture<CwptGzbwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptGzbwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptGzbwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
