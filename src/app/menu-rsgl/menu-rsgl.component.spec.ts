import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRsglComponent } from './menu-rsgl.component';

describe('MenuRsglComponent', () => {
  let component: MenuRsglComponent;
  let fixture: ComponentFixture<MenuRsglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRsglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRsglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
