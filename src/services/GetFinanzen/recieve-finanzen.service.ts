import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Ausgaben } from 'src/model/ausgaben';
import { Einnahmen } from 'src/model/einnahmen';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecieveFinanzenService {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  getEinnahmen(): Observable<Einnahmen[]> {
    return this.httpClient
      .get<Einnahmen[]>(`${'http://localhost:8080/einnahmen'}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  getAusgaben(): Observable<Ausgaben[]> {
    return this.httpClient
      .get<Ausgaben[]>(`${'http://localhost:8080/ausgaben'}`)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
