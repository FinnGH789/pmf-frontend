import { Component, input, signal } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FinanceHistoryComponent } from '../finance-history/finance-history.component';

@Component({
  selector: 'app-finance-overview',
  imports: [ChartComponent, FinanceHistoryComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css',
})
export class FinanceOverviewComponent {
  einnahmenList = input.required<Einnahmen[]>();
  ausgabenList = input.required<Ausgaben[]>();

  changeList = signal<boolean>(true);

  toggleList() {
    this.changeList.update((change) => (change = !change));
  }
}
