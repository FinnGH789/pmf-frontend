import {
  Component,
  computed,
  inject,
  OnInit,
  resource,
  Signal,
  signal,
} from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FormsModule } from '@angular/forms';
import { FinanceSummateComponent } from '../finance-summate/finance-summate.component';
import { Constants } from 'src/constants/constants';

@Component({
  selector: 'app-finance-summary',
  imports: [FinanceCardComponent, FormsModule, FinanceSummateComponent],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css',
})
export class FinanceSummaryComponent {
  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  cashBalance = computed(() => this.totalEinnahmen.value() - this.totalAusgaben.value());

  addEinnahmenWindow: boolean = false;
  addAusgabenWindow: boolean = false;

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
}
