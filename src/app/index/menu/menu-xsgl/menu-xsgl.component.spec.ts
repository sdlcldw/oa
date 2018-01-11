import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuXsglComponent } from './menu-xsgl.component';

describe('MenuXsglComponent', () => {
  let component: MenuXsglComponent;
  let fixture: ComponentFixture<MenuXsglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuXsglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuXsglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
