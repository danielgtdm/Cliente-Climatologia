import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresionAtmosfericaComponent } from './presion-atmosferica.component';

describe('PresionAtmosfericaComponent', () => {
  let component: PresionAtmosfericaComponent;
  let fixture: ComponentFixture<PresionAtmosfericaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresionAtmosfericaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresionAtmosfericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
