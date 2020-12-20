import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitacionTfComponent } from './precipitacion-tf.component';

describe('PrecipitacionTfComponent', () => {
  let component: PrecipitacionTfComponent;
  let fixture: ComponentFixture<PrecipitacionTfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecipitacionTfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitacionTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
