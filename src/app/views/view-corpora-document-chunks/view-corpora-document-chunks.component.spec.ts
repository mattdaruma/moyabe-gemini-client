import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorporaDocumentChunksComponent } from './view-corpora-document-chunks.component';

describe('ViewCorporaDocumentChunksComponent', () => {
  let component: ViewCorporaDocumentChunksComponent;
  let fixture: ComponentFixture<ViewCorporaDocumentChunksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCorporaDocumentChunksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCorporaDocumentChunksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
