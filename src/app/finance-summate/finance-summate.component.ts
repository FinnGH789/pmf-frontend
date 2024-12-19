import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  NgModule,
  Output,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';
import { AusgabenService } from 'src/services/AusgabenService/ausgaben.service';
import { EinnahmenService } from 'src/services/EinnahmenService/einnahmen.service';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'app-finance-summate',
  imports: [FormsModule, InputTextComponent, ReactiveFormsModule],
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

  ausgabenForm = new FormGroup({
    grund_ausgaben: new FormControl('', Validators.required),
    betrag_ausgaben: new FormControl('', Validators.required),
    method_ausgaben: new FormControl('', Validators.required)
  });

  einnahmenForm = new FormGroup({
    grund_einnahmen: new FormControl('', Validators.required),
    betrag_einnahmen: new FormControl('', Validators.required),
    method_einnahmen: new FormControl('', Validators.required)
  });

  toggleSummate() {
    this.openSummate.update((val) => !val);
    this.einnahmenForm.reset();
    this.ausgabenForm.reset();
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
      this.einnahmenForm.reset();
      this.ausgabenForm.reset();
    }
  }
}
