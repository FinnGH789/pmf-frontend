import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable } from 'rxjs';
import { Einnahmen } from 'src/model/einnahmen';

@Injectable({
  providedIn: 'root',
})
export class EinnahmenService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  getEinnahmen(): Observable<Einnahmen[]> {
    return this.httpClient
      .get<Einnahmen[]>(`${'http://localhost:8080/einnahmen'}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  getTotalEinnahmen() {
    return this.httpClient
      .get<Einnahmen>(`${'http://localhost:8080/totalEinnahmen'}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  addEinnahme(einnahmen: Einnahmen): Observable<Einnahmen> {
    return this.httpClient
      .post<Einnahmen>(`${'http://localhost:8080/addEinnahmen'}`, einnahmen)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          throw 'Fehler beim Hinzufügen der Einnahme: ' + error;
        })
      );
  }
}
