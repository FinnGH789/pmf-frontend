import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root',
})
export class RecieveFinanzenService {
  http = inject(HttpClient);

  getEinnahmen() {
    return this.http
      .get<Einnahmen[]>(`${'http://localhost:8080/einnahmen'}`)
      .pipe(takeUntilDestroyed())
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getAusgaben() {
    return this.http
      .get<Ausgaben[]>(`${'http://localhost:8080/ausgaben'}`)
      .pipe(takeUntilDestroyed())
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}

//Frage ist ob hier für (RR.) - http-calls vllt promises besser sind?