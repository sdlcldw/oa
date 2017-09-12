import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcmxComponent } from './zcmx.component';

describe('ZcmxComponent', () => {
  let component: ZcmxComponent;
  let fixture: ComponentFixture<ZcmxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcmxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcmxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
