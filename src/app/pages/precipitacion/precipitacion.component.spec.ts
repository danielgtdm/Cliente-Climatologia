import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitacionComponent } from './precipitacion.component';

describe('PrecipitacionComponent', () => {
  let component: PrecipitacionComponent;
  let fixture: ComponentFixture<PrecipitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecipitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
