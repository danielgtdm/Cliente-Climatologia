import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermometroSecoComponent } from './termometro-seco.component';

describe('TermometroSecoComponent', () => {
  let component: TermometroSecoComponent;
  let fixture: ComponentFixture<TermometroSecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermometroSecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermometroSecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
