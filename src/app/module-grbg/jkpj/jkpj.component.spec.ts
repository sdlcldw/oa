import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JkpjComponent } from './jkpj.component';

describe('JkpjComponent', () => {
  let component: JkpjComponent;
  let fixture: ComponentFixture<JkpjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JkpjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JkpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
