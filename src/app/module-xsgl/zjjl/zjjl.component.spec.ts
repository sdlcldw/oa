import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZjjlComponent } from './zjjl.component';

describe('ZjjlComponent', () => {
  let component: ZjjlComponent;
  let fixture: ComponentFixture<ZjjlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZjjlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZjjlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
