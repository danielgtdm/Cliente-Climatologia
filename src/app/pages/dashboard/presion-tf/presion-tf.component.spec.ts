import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresionTfComponent } from './presion-tf.component';

describe('PresionTfComponent', () => {
  let component: PresionTfComponent;
  let fixture: ComponentFixture<PresionTfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresionTfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresionTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
