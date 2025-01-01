import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPanelErrorComponent } from './shared-panel-error.component';

describe('SharedPanelErrorComponent', () => {
  let component: SharedPanelErrorComponent;
  let fixture: ComponentFixture<SharedPanelErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPanelErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedPanelErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
