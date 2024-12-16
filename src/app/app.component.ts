import { Component, inject, OnInit, signal } from '@angular/core';
import { Einnahmen } from 'src/model/einnahmen';
import { Ausgaben } from 'src/model/ausgaben';
import { FormsModule } from '@angular/forms';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { HeaderComponent } from './header/header.component';
import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';
import { FinanceOverviewComponent } from './finance-overview/finance-overview.component';
import { RouterModule } from '@angular/router';

@Component({
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pmf-frontend';
  
}
