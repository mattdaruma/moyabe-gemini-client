import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCachedContentsComponent } from './view-cached-contents.component';

describe('ViewCachedContentsComponent', () => {
  let component: ViewCachedContentsComponent;
  let fixture: ComponentFixture<ViewCachedContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCachedContentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCachedContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
