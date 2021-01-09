import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthercategoriesComponent } from './othercategories.component';

describe('OthercategoriesComponent', () => {
  let component: OthercategoriesComponent;
  let fixture: ComponentFixture<OthercategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthercategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthercategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
