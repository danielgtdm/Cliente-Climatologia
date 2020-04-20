import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRangoDiasComponent } from './tabla-rango-dias.component';

describe('TablaRangoDiasComponent', () => {
  let component: TablaRangoDiasComponent;
  let fixture: ComponentFixture<TablaRangoDiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRangoDiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRangoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
