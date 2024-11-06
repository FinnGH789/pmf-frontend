import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable, take } from 'rxjs';
import { Constants } from 'src/constants/constants';
import { Einnahmen } from 'src/model/einnahmen';

@Injectable({
  providedIn: 'root',
})
export class EinnahmenService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  getEinnahmen(): Observable<Einnahmen[]> {
    return this.httpClient
      .get<Einnahmen[]>(Constants.getEinnahmenUrl)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  getTotalEinnahmen(): Observable<number> {
    return this.httpClient
      .get<number>(Constants.getTotalEinnahmenUrl)
      .pipe(take(1));
  }

  addEinnahme(einnahmen: Einnahmen): Observable<Einnahmen> {
    return this.httpClient
      .post<Einnahmen>(Constants.addEinahmeUrl, einnahmen)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Einnahme: ' + error;
        })
      );
  }
}
