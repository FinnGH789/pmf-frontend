import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { Constants } from 'src/constants/constants';
import { FinanceHistoryComponent } from '../finance-history/finance-history.component';

@Component({
  selector: 'app-finance-overview',
  imports: [ChartComponent, FinanceHistoryComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css',
})
export class FinanceOverviewComponent {

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  changeList = signal<boolean>(true);

  highestEinnahmen = signal<any[]>([]);
  highestAusgaben = signal<string[]>([]);

  toggleList() {
    this.changeList.update((change) => (change = !change));
  }

  totalEinnahmenList = resource<Einnahmen[], Boolean>({
    //TODO resource params prüfen
    request: () => this.changeList(),
    loader: async () => {
      const res = await fetch(Constants.getEinnahmenUrl);
      return await res.json();
    },
  });

  totalAusgabenList = resource<Ausgaben[], Boolean>({
    //TODO resource params prüfen
    request: () => this.changeList(),
    loader: async () => {
      const res = await fetch(Constants.getAusgabenUrl);
      return await res.json();
    },
  });
}
