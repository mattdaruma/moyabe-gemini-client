import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCorporaPermissionsComponent } from './resource-corpora-permissions.component';

describe('ResourceCorporaPermissionsComponent', () => {
  let component: ResourceCorporaPermissionsComponent;
  let fixture: ComponentFixture<ResourceCorporaPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCorporaPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCorporaPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
