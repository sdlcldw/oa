import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZclyComponent } from './zcly.component';

describe('ZclyComponent', () => {
  let component: ZclyComponent;
  let fixture: ComponentFixture<ZclyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZclyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZclyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
