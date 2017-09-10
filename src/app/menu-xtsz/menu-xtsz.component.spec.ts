import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuXtszComponent } from './menu-xtsz.component';

describe('MenuXtszComponent', () => {
  let component: MenuXtszComponent;
  let fixture: ComponentFixture<MenuXtszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuXtszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuXtszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
