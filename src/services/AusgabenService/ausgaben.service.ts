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

  getAusgaben(): Observable<Ausgaben[]> {
    return this.httpClient
      .get<Ausgaben[]>(Constants.getAusgabenUrl)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  getTotalAusgaben() {
    return this.httpClient
      .get<Ausgaben>(Constants.getTotalAusgabenUrl)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  addAusgabe(ausgaben: Ausgaben): Observable<Ausgaben> {
    return this.httpClient
      .post<Ausgaben>(Constants.addAusgabeUrl, ausgaben)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Ausgabe: ' + error;
        })
      );
  }
}
