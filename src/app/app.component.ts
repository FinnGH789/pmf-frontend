import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RecieveFinanzenService } from '../services/GetFinanzen/recieve-finanzen.service';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FormsModule } from '@angular/forms';
import { SetFinanzenService } from 'src/services/PostFinanzen/set-finanzen.service';
import { ChartComponent } from './chart/chart.component';

@Component({
  standalone: true,
  imports: [FormsModule, ChartComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pmf-frontend';

  einnahmen: Einnahmen = { id: '', name: '', einnahme: '' };
  ausgaben: Ausgaben = { id: '', name: '', ausgaben: '' };

  getFinanzenService = inject(RecieveFinanzenService);
  postFinanzenService = inject(SetFinanzenService);

  einnahmenList = signal<Einnahmen[]>([]);
  ausgabenList = signal<Ausgaben[]>([]);

  ngOnInit() {
    this.getFinanzenService.getEinnahmen().subscribe((data) => {
      this.einnahmenList.update((values) => {
        return (values = data);
      });
    });

    this.getFinanzenService.getEinnahmen().subscribe(
      (data) => {
        this.einnahmenList.update((values) => {
          console.log(values);
          return (values = data);
        });
      },
      (error) => {
        console.error('Fehler beim Laden der Liste:', error);
      }
    );
  }

  addEinnahme() {
    this.postFinanzenService
      .postEinnahmen(this.einnahmen)
      .subscribe((response) => {
        console.log('Einnahme erfolgreich hinzugefügt:', response);
      });
  }

  addAusgaben() {
    this.postFinanzenService
      .postEinnahmen(this.einnahmen)
      .subscribe((response) => {
        console.log('Ausgabe erfolgreich hinzugefügt:', response);
      });
  }
}
