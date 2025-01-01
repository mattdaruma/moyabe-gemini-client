import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTunedmodelsPermissionsComponent } from './resource-tunedmodels-permissions.component';

describe('ResourceTunedmodelsPermissionsComponent', () => {
  let component: ResourceTunedmodelsPermissionsComponent;
  let fixture: ComponentFixture<ResourceTunedmodelsPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTunedmodelsPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTunedmodelsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
