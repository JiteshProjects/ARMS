import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjSummaryComponent } from './prj-summary.component';

describe('PrjSummaryComponent', () => {
  let component: PrjSummaryComponent;
  let fixture: ComponentFixture<PrjSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
