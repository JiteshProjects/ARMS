import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjAbstractComponent } from './prj-abstract.component';

describe('PrjAbstractComponent', () => {
  let component: PrjAbstractComponent;
  let fixture: ComponentFixture<PrjAbstractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjAbstractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
