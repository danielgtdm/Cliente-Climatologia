import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosNoEncontradosComponent } from './registros-no-encontrados.component';

describe('RegistrosNoEncontradosComponent', () => {
  let component: RegistrosNoEncontradosComponent;
  let fixture: ComponentFixture<RegistrosNoEncontradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosNoEncontradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosNoEncontradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
