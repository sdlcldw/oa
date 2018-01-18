import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KsxkComponent } from './ksxk.component';

describe('KsxkComponent', () => {
  let component: KsxkComponent;
  let fixture: ComponentFixture<KsxkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsxkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KsxkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
