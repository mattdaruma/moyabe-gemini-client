import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCorporaComponent } from './resource-corpora.component';

describe('ResourceCorporaComponent', () => {
  let component: ResourceCorporaComponent;
  let fixture: ComponentFixture<ResourceCorporaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCorporaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCorporaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
