import { Component, inject } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';

@Component({
  selector: 'app-finance-overview',
  imports: [ChartComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css'
})
export class FinanceOverviewComponent {

  ausgabenService = inject(AusgabenService)


}
