import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelDetailsComponent } from './view-model-details.component';

describe('ViewModelDetailsComponent', () => {
  let component: ViewModelDetailsComponent;
  let fixture: ComponentFixture<ViewModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
