import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCachedContentsComponent } from './resource-cached-contents.component';

describe('ResourceCachedContentsComponent', () => {
  let component: ResourceCachedContentsComponent;
  let fixture: ComponentFixture<ResourceCachedContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCachedContentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCachedContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
