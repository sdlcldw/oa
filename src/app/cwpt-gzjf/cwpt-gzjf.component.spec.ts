import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptGzjfComponent } from './cwpt-gzjf.component';

describe('CwptGzjfComponent', () => {
  let component: CwptGzjfComponent;
  let fixture: ComponentFixture<CwptGzjfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptGzjfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptGzjfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
