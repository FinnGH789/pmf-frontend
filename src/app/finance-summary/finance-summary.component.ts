import { Component } from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';

@Component({
  selector: 'app-finance-summary',
  imports: [FinanceCardComponent],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css'
})
export class FinanceSummaryComponent {

}
