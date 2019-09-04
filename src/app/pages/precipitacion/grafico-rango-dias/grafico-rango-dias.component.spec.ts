import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRangoDiasComponent } from './grafico-rango-dias.component';

describe('GraficoRangoDiasComponent', () => {
  let component: GraficoRangoDiasComponent;
  let fixture: ComponentFixture<GraficoRangoDiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoRangoDiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoRangoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
