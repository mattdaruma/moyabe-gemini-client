import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListTableComponent } from './view-list-table.component';

describe('ViewListTableComponent', () => {
  let component: ViewListTableComponent;
  let fixture: ComponentFixture<ViewListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
