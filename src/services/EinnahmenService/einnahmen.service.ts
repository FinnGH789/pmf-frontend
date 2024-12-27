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
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  getTotalEinnahmen(): Observable<number> {
    return this.httpClient
      .get<number>(Constants.getTotalEinnahmenUrl)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  totalEinnahmenList() {
    return fetch(Constants.getEinnahmenUrl).then((res) => res.json());
  }

  addEinnahme(einnahmen: Einnahmen): Observable<Einnahmen> {
    return this.httpClient
      .post<Einnahmen>(Constants.addEinahmeUrl, einnahmen)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Einnahme: ' + error;
        }),
      );
  }
}
