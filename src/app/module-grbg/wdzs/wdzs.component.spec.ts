import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WdzsComponent } from './wdzs.component';

describe('WdzsComponent', () => {
  let component: WdzsComponent;
  let fixture: ComponentFixture<WdzsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WdzsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WdzsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
