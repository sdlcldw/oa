import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KqbscComponent } from './kqbsc.component';

describe('KqbscComponent', () => {
  let component: KqbscComponent;
  let fixture: ComponentFixture<KqbscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KqbscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KqbscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
