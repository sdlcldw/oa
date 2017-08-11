import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptGzbscComponent } from './cwpt-gzbsc.component';

describe('CwptGzbscComponent', () => {
  let component: CwptGzbscComponent;
  let fixture: ComponentFixture<CwptGzbscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptGzbscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptGzbscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
