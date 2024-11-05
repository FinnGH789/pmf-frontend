import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Einnahmen', 'Ausgaben',],
        datasets: [
          {
            data: [19, 12],
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
  }
}
