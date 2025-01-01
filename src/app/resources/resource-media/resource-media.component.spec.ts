import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMediaComponent } from './resource-media.component';

describe('ResourceMediaComponent', () => {
  let component: ResourceMediaComponent;
  let fixture: ComponentFixture<ResourceMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
