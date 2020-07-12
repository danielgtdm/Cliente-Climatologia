import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenandoComponent } from './entrenando.component';

describe('EntrenandoComponent', () => {
  let component: EntrenandoComponent;
  let fixture: ComponentFixture<EntrenandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
