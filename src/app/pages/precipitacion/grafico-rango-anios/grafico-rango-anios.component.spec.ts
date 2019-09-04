import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRangoAniosComponent } from './grafico-rango-anios.component';

describe('GraficoRangoAniosComponent', () => {
  let component: GraficoRangoAniosComponent;
  let fixture: ComponentFixture<GraficoRangoAniosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoRangoAniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoRangoAniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
