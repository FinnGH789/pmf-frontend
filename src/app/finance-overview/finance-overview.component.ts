import { Component, inject, signal } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';

@Component({
  selector: 'app-finance-overview',
  imports: [ChartComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css'
})
export class FinanceOverviewComponent {

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  einnahmenList = signal<Einnahmen[]>([]);
  ausgabenList = signal<Ausgaben[]>([]);

  ngOnInit() {
    this.einnahmenService.getEinnahmen().subscribe((data) => {
      this.einnahmenList.update((values) => {
        console.log(data)
        return (values = data);
      });
    });

    this.ausgabenService.getAusgaben().subscribe((data) => {
      this.ausgabenList.update((values) => {
        console.log(data)
        return (values = data);
      });
    });
  }
}
