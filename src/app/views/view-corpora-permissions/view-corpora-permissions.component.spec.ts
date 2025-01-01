import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorporaPermissionsComponent } from './view-corpora-permissions.component';

describe('ViewCorporaPermissionsComponent', () => {
  let component: ViewCorporaPermissionsComponent;
  let fixture: ComponentFixture<ViewCorporaPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCorporaPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCorporaPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
