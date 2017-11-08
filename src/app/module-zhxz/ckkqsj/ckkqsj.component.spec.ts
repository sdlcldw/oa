import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkkqsjComponent } from './ckkqsj.component';

describe('CkkqsjComponent', () => {
  let component: CkkqsjComponent;
  let fixture: ComponentFixture<CkkqsjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkkqsjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkkqsjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
