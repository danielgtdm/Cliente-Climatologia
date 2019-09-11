import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NubosidadComponent } from './nubosidad.component';

describe('NubosidadComponent', () => {
  let component: NubosidadComponent;
  let fixture: ComponentFixture<NubosidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NubosidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NubosidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
