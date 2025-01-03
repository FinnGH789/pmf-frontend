import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable } from 'rxjs';
import { Constants } from 'src/constants/constants';
import { Ausgaben } from 'src/model/ausgaben';

@Injectable({
  providedIn: 'root',
})
export class AusgabenService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  getTotalAusgaben(): Observable<number> {
    return this.httpClient
      .get<number>(Constants.getTotalAusgabenUrl)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  totalAusgabenList() {
    return fetch(Constants.getAusgabenUrl).then((res) => res.json());
  }

  addAusgabe(ausgaben: Ausgaben): Observable<Ausgaben> {
    return this.httpClient
      .post<Ausgaben>(Constants.addAusgabeUrl, ausgaben)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Ausgabe: ' + error;
        }),
      );
  }
}
