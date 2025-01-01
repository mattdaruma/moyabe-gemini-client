import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCorporaDocumentsComponent } from './resource-corpora-documents.component';

describe('ResourceCorporaDocumentsComponent', () => {
  let component: ResourceCorporaDocumentsComponent;
  let fixture: ComponentFixture<ResourceCorporaDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCorporaDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCorporaDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
