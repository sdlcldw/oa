import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KtjlCkComponent } from './ktjl-ck.component';

describe('KtjlCkComponent', () => {
  let component: KtjlCkComponent;
  let fixture: ComponentFixture<KtjlCkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KtjlCkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KtjlCkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
