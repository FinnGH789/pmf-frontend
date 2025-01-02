import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { FormsModule } from '@angular/forms';
import { FinanceSummateComponent } from '../finance-summate/finance-summate.component';
import { Constants } from 'src/constants/constants';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FinanceOverviewComponent } from '../finance-overview/finance-overview.component';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';

@Component({
  selector: 'app-finance-summary',
  imports: [
    FinanceCardComponent,
    FormsModule,
    FinanceSummateComponent,
    FinanceOverviewComponent,
  ],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css',
})
export class FinanceSummaryComponent {
  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  showDecimals = signal<boolean>(true);

  toggleDecimals() {
    this.totalEinnahmen.update((t) => {
      parseFloat(t)
    });
  }

  cashBalance = computed(
    () => this.totalEinnahmen.value() - this.totalAusgaben.value(),
  );

  totalEinnahmen = resource({
    loader: async () => {
      const res = await fetch(Constants.getTotalEinnahmenUrl);
      return await res.json();
    },
  });

  totalAusgaben = resource({
    loader: async () => {
      const res = await fetch(Constants.getTotalAusgabenUrl);
      return await res.json();
    },
  });

  totalEinnahmenList = resource({
    request: () => this.cashBalance(),
    loader: async () => {
      return await this.einnahmenService.totalEinnahmenList();
    },
  });

  totalAusgabenList = resource({
    request: () => this.cashBalance(),
    loader: async () => {
      return await this.ausgabenService.totalAusgabenList();
    },
  });

  handleAddEinnahmen(einnahme: Einnahmen) {
    this.totalEinnahmen.update(
      (current) => Number(current) + Number(einnahme?.beschreibung),
    );

    this.einnahmenService.addEinnahme(einnahme).subscribe({
      next: (response) => {
        this.totalEinnahmenList.reload();
      },
    });
  }

  handleAddAusgaben(ausgabe: Ausgaben) {
    this.totalAusgaben.update(
      (current) => Number(current) + Number(ausgabe?.beschreibung),
    );
    this.ausgabenService.addAusgabe(ausgabe).subscribe({
      next: (response) => {
        this.totalAusgabenList.reload();
      },
    });
  }
}
