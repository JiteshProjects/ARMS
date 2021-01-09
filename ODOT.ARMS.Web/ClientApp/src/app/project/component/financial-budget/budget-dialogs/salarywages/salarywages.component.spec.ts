import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarywagesComponent } from './salarywages.component';

describe('SalarywagesComponent', () => {
  let component: SalarywagesComponent;
  let fixture: ComponentFixture<SalarywagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarywagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarywagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
