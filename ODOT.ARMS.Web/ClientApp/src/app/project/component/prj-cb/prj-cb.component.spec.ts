import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjCbComponent } from './prj-cb.component';

describe('PrjCbComponent', () => {
  let component: PrjCbComponent;
  let fixture: ComponentFixture<PrjCbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjCbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
