import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [FormsModule, ChartComponent, HeaderComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pmf-frontend';

  einnahmen: Einnahmen = { id: '', name: '', einnahme: '' };
  ausgaben: Ausgaben = { id: '', name: '', ausgaben: '' };

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

  addEinnahme() {
    this.einnahmenService
      .addEinnahme(this.einnahmen)
      .subscribe((response) => {
        console.log('Einnahme erfolgreich hinzugefügt:', response);
      });
  }

  addAusgaben() {
    this.ausgabenService
      .addAusgabe(this.ausgaben)
      .subscribe((response) => {
        console.log('Ausgabe erfolgreich hinzugefügt:', response);
      });
  }
}
