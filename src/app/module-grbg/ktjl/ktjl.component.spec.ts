import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KtjlComponent } from './ktjl.component';

describe('KtjlComponent', () => {
  let component: KtjlComponent;
  let fixture: ComponentFixture<KtjlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KtjlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KtjlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
