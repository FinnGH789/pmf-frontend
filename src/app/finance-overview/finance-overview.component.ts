import { Component, inject, resource, signal } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { Constants } from 'src/constants/constants';

@Component({
  selector: 'app-finance-overview',
  imports: [ChartComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css',
})
export class FinanceOverviewComponent {
  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  totalEinnahmenList = resource({
    loader: async () => {
      const res = await fetch(Constants.getEinnahmenUrl);
      return await res.json();
    },
  });

  totalAusgabenList = resource({
    loader: async () => {
      const res = await fetch(Constants.getAusgabenUrl);
      return await res.json();
    },
  });
}
