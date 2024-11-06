import { Component, inject, OnInit, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any = [];

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);

  einnahmenTotal = signal<number>(0);
  ausgabenTotal = signal<number>(0);



  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.ausgabenService.getTotalAusgaben().subscribe((data) => {
      this.ausgabenTotal.set(data);
  
    this.einnahmenService.getTotalEinnahmen().subscribe((data) => {
      this.einnahmenTotal.set(data);
    
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Einnahmen', 'Ausgaben',],
        datasets: [
          {
            data: [this.einnahmenTotal(), this.ausgabenTotal()],
            borderWidth: 3,
            backgroundColor: [
              '#83dc24',
              '#c83a33'
            ],
          },
        ],
      },
      options: {
        scales: {
        },
      },
    });
  })
  })
  }
}
