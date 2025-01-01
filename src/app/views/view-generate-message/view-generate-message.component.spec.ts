import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGenerateMessageComponent } from './view-generate-message.component';

describe('ViewGenerateMessageComponent', () => {
  let component: ViewGenerateMessageComponent;
  let fixture: ComponentFixture<ViewGenerateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGenerateMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGenerateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
