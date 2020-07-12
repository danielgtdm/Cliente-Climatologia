import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturaTfComponent } from './temperatura-tf.component';

describe('TemperaturaTfComponent', () => {
  let component: TemperaturaTfComponent;
  let fixture: ComponentFixture<TemperaturaTfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturaTfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturaTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
