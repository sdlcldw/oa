import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YckqComponent } from './yckq.component';

describe('YckqComponent', () => {
  let component: YckqComponent;
  let fixture: ComponentFixture<YckqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YckqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YckqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
