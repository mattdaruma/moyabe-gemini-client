import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodGetComponent } from './method-get.component';

describe('MethodGetComponent', () => {
  let component: MethodGetComponent;
  let fixture: ComponentFixture<MethodGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodGetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
