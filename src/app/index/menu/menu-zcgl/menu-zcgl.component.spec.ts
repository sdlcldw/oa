import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuZcglComponent } from './menu-zcgl.component';

describe('MenuZcglComponent', () => {
  let component: MenuZcglComponent;
  let fixture: ComponentFixture<MenuZcglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuZcglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuZcglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
