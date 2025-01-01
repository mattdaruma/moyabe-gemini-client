import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTunedmodelsComponent } from './resource-tunedmodels.component';

describe('ResourceTunedmodelsComponent', () => {
  let component: ResourceTunedmodelsComponent;
  let fixture: ComponentFixture<ResourceTunedmodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTunedmodelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTunedmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
