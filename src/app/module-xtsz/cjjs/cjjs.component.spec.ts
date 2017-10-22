import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CjjsComponent } from './cjjs.component';

describe('JsglComponent', () => {
  let component: CjjsComponent;
  let fixture: ComponentFixture<CjjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CjjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CjjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
