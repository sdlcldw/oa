import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcwjComponent } from './dcwj.component';

describe('DcwjComponent', () => {
  let component: DcwjComponent;
  let fixture: ComponentFixture<DcwjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcwjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcwjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
