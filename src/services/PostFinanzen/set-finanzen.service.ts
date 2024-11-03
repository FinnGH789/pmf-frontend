import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable } from 'rxjs';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';

@Injectable({
  providedIn: 'root',
})
export class SetFinanzenService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  postEinnahmen(einnahmen: Einnahmen): Observable<Einnahmen> {
    return this.httpClient
      .post<Einnahmen>(`${'http://localhost:8080/addEinnahmen'}`, einnahmen)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Einnahme: ' + error;
        })
      );
  }

  postAusgaben(ausgaben: Ausgaben): Observable<Ausgaben> {
    return this.httpClient
      .post<Ausgaben>(`${'http://localhost:8080/addAusgaben'}`, ausgaben)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Ausgabe: ' + error;
        })
      );
  }
}
