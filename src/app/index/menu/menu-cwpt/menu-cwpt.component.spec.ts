import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCwptComponent } from './menu-cwpt.component';

describe('MenuCwptComponent', () => {
  let component: MenuCwptComponent;
  let fixture: ComponentFixture<MenuCwptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCwptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCwptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
