import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiVersionComponent } from './api-version.component';

describe('ApiVersionComponent', () => {
  let component: ApiVersionComponent;
  let fixture: ComponentFixture<ApiVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiVersionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
