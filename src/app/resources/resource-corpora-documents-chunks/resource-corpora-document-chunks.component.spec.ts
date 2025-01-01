import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCorporaDocumentChunksComponent } from './resource-corpora-document-chunks.component';

describe('ResourceCorporaDocumentChunksComponent', () => {
  let component: ResourceCorporaDocumentChunksComponent;
  let fixture: ComponentFixture<ResourceCorporaDocumentChunksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCorporaDocumentChunksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCorporaDocumentChunksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
