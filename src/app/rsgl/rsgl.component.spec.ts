import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsglComponent } from './rsgl.component';

describe('RsglComponent', () => {
  let component: RsglComponent;
  let fixture: ComponentFixture<RsglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
