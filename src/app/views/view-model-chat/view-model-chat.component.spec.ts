import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelChatComponent } from './view-model-chat.component';

describe('ViewModelChatComponent', () => {
  let component: ViewModelChatComponent;
  let fixture: ComponentFixture<ViewModelChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModelChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModelChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
