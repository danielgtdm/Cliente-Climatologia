import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermometroHumedoComponent } from './termometro-humedo.component';

describe('TermometroHumedoComponent', () => {
  let component: TermometroHumedoComponent;
  let fixture: ComponentFixture<TermometroHumedoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermometroHumedoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermometroHumedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
