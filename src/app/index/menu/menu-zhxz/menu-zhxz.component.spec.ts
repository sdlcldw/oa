import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuZhxzComponent } from './menu-zhxz.component';

describe('MenuZhxzComponent', () => {
  let component: MenuZhxzComponent;
  let fixture: ComponentFixture<MenuZhxzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuZhxzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuZhxzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
