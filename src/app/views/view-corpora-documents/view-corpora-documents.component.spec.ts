import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorporaDocumentsComponent } from './view-corpora-documents.component';

describe('ViewCorporaDocumentsComponent', () => {
  let component: ViewCorporaDocumentsComponent;
  let fixture: ComponentFixture<ViewCorporaDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCorporaDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCorporaDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
