import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRangoMesesComponent } from './grafico-rango-meses.component';

describe('GraficoRangoMesesComponent', () => {
  let component: GraficoRangoMesesComponent;
  let fixture: ComponentFixture<GraficoRangoMesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoRangoMesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoRangoMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
