import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDiaComponent } from './historial-dia.component';

describe('HistorialDiaComponent', () => {
  let component: HistorialDiaComponent;
  let fixture: ComponentFixture<HistorialDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
