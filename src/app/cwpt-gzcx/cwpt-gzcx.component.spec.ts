import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptGzcxComponent } from './cwpt-gzcx.component';

describe('CwptGzcxComponent', () => {
  let component: CwptGzcxComponent;
  let fixture: ComponentFixture<CwptGzcxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptGzcxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptGzcxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
