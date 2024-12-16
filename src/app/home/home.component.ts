import { Component } from '@angular/core';
import { FinanceOverviewComponent } from '../finance-overview/finance-overview.component';
import { HeaderComponent } from '../header/header.component';
import { FinanceSummaryComponent } from '../finance-summary/finance-summary.component';

@Component({
  selector: 'app-home',
  imports: [FinanceOverviewComponent, HeaderComponent, FinanceSummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
