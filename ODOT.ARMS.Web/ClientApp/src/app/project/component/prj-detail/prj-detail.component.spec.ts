import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjDetailComponent } from './prj-detail.component';

describe('PrjDetailComponent', () => {
  let component: PrjDetailComponent;
  let fixture: ComponentFixture<PrjDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
