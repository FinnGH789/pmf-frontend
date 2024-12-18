import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Output,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';

@Component({
  selector: 'app-finance-summate',
  imports: [FormsModule],
  templateUrl: './finance-summate.component.html',
  styleUrl: './finance-summate.component.css',
})
export class FinanceSummateComponent {
  icon = input.required<string>();
  caption = input.required<string>();
  label = input.required<string>();
  backgroundColor = input.required<string>();

  popUpCaption = input<string>('');
  popUpLabel = input<string>('');
  einnahmeTruthy = input<boolean>(false);

  addEinnahmenEvent = output<Einnahmen>();
  addAusgabenEvent = output<Einnahmen>();

  einnahmenService = inject(EinnahmenService);
  ausgabenService = inject(AusgabenService);
  elementRef = inject(ElementRef);

  openSummate = signal<boolean>(false);

  einnahme = new Einnahmen();
  ausgabe = new Ausgaben();

  toggleSummate() {
    this.openSummate.update((val) => !val);
  }

  addEinnahmen(einnahme: Einnahmen) {
    this.addEinnahmenEvent.emit(einnahme);
    return this.einnahmenService.addEinnahme(einnahme).subscribe();
  }

  addAusgaben(ausgabe: Ausgaben) {
    this.addAusgabenEvent.emit(ausgabe);
    return this.ausgabenService.addAusgabe(ausgabe).subscribe();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.openSummate &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.openSummate.set(false);
    }
  }
}
