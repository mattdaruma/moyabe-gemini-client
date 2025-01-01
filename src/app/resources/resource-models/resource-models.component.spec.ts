import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModelsComponent } from './resource-models.component';

describe('ResourceModelsComponent', () => {
  let component: ResourceModelsComponent;
  let fixture: ComponentFixture<ResourceModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
