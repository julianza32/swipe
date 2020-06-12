import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCancionComponent } from './registro-cancion.component';

describe('RegistroCancionComponent', () => {
  let component: RegistroCancionComponent;
  let fixture: ComponentFixture<RegistroCancionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCancionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
