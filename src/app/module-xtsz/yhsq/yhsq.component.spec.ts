import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YhsqComponent } from './yhsq.component';

describe('YhsqComponent', () => {
  let component: YhsqComponent;
  let fixture: ComponentFixture<YhsqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YhsqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YhsqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
