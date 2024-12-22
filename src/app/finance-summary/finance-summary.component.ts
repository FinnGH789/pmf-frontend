import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  resource,
} from '@angular/core';
import { FinanceCardComponent } from '../finance-card/finance-card.component';
import { FormsModule } from '@angular/forms';
import { FinanceSummateComponent } from '../finance-summate/finance-summate.component';
import { Constants } from 'src/constants/constants';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';

@Component({
  selector: 'app-finance-summary',
  imports: [FinanceCardComponent, FormsModule, FinanceSummateComponent],
  templateUrl: './finance-summary.component.html',
  styleUrl: './finance-summary.component.css',
})
export class FinanceSummaryComponent {

  cashBalance = computed(
    () => this.totalEinnahmen.value() - this.totalAusgaben.value()
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

  handleAddEinnahmen(einnahme: Einnahmen) {
    console.log('Einnahme hinzugefügt:', einnahme);
  
    this.totalEinnahmen.update((current) => 
      Number(current) + Number(einnahme?.beschreibung)
    );
  }

  handleAddAusgaben(ausgabe: Ausgaben) {
    console.log('Ausgabe hinzugefügt:', ausgabe);
  
    this.totalAusgaben.update((current) => 
      Number(current) + Number(ausgabe?.beschreibung)
    );
  }
  

}
