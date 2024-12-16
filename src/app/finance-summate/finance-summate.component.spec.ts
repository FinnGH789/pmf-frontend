import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSummateComponent } from './finance-summate.component';

describe('FinanceSummateComponent', () => {
  let component: FinanceSummateComponent;
  let fixture: ComponentFixture<FinanceSummateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceSummateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceSummateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
