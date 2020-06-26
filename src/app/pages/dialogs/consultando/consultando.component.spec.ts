import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultandoComponent } from './consultando.component';

describe('ConsultandoComponent', () => {
  let component: ConsultandoComponent;
  let fixture: ComponentFixture<ConsultandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
