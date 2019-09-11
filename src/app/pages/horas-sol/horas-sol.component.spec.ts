import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasSolComponent } from './horas-sol.component';

describe('HorasSolComponent', () => {
  let component: HorasSolComponent;
  let fixture: ComponentFixture<HorasSolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasSolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasSolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
