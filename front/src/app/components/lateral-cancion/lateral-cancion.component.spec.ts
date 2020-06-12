import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralCancionComponent } from './lateral-cancion.component';

describe('LateralCancionComponent', () => {
  let component: LateralCancionComponent;
  let fixture: ComponentFixture<LateralCancionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralCancionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
