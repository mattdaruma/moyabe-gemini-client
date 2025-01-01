import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsJsonComponent } from './view-details-json.component';

describe('ViewDetailsJsonComponent', () => {
  let component: ViewDetailsJsonComponent;
  let fixture: ComponentFixture<ViewDetailsJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
