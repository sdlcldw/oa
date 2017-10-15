import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YhsqFpjsComponent } from './yhsq-fpjs.component';

describe('YhsqFqjsComponent', () => {
  let component: YhsqFpjsComponent;
  let fixture: ComponentFixture<YhsqFpjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YhsqFpjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YhsqFpjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
