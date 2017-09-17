import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YhlbComponent } from './yhlb.component';

describe('YhlbComponent', () => {
  let component: YhlbComponent;
  let fixture: ComponentFixture<YhlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YhlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YhlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
