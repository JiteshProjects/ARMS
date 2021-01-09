import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjInfoBaseComponent } from './prj-info-base.component';

describe('PrjInfoBaseComponent', () => {
  let component: PrjInfoBaseComponent;
  let fixture: ComponentFixture<PrjInfoBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjInfoBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjInfoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
