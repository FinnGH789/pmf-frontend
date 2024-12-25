import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceHistoryComponent } from './finance-history.component';

describe('FinanceHistoryComponent', () => {
  let component: FinanceHistoryComponent;
  let fixture: ComponentFixture<FinanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
