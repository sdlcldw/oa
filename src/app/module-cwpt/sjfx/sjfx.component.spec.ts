import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SjfxComponent } from './sjfx.component';

describe('SjfxComponent', () => {
  let component: SjfxComponent;
  let fixture: ComponentFixture<SjfxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SjfxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SjfxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
