import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjFinancialsComponent } from './prj-financials.component';

describe('PrjFinancialsComponent', () => {
  let component: PrjFinancialsComponent;
  let fixture: ComponentFixture<PrjFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjFinancialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
