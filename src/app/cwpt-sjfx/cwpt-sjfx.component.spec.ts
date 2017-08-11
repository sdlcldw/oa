import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwptSjfxComponent } from './cwpt-sjfx.component';

describe('CwptSjfxComponent', () => {
  let component: CwptSjfxComponent;
  let fixture: ComponentFixture<CwptSjfxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwptSjfxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwptSjfxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
