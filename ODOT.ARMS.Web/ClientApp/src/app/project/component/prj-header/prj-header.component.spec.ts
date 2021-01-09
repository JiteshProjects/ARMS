import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjHeaderComponent } from './prj-header.component';

describe('PrjHeaderComponent', () => {
  let component: PrjHeaderComponent;
  let fixture: ComponentFixture<PrjHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
