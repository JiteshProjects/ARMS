import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationsUploadsComponent } from './modifications-uploads.component';

describe('ModificationsUploadsComponent', () => {
  let component: ModificationsUploadsComponent;
  let fixture: ComponentFixture<ModificationsUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
