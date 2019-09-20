import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilidadComponent } from './visibilidad.component';

describe('VisibilidadComponent', () => {
  let component: VisibilidadComponent;
  let fixture: ComponentFixture<VisibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
