import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGrbgComponent } from './menu-grbg.component';

describe('MenuGrbgComponent', () => {
  let component: MenuGrbgComponent;
  let fixture: ComponentFixture<MenuGrbgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGrbgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGrbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
