import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeotermometrosComponent } from './geotermometros.component';

describe('GeotermometrosComponent', () => {
  let component: GeotermometrosComponent;
  let fixture: ComponentFixture<GeotermometrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeotermometrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeotermometrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
