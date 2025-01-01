import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorporaComponent } from './view-corpora.component';

describe('ViewCorporaComponent', () => {
  let component: ViewCorporaComponent;
  let fixture: ComponentFixture<ViewCorporaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCorporaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCorporaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
