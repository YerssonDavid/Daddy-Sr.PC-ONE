import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LiveDemoApi {
  /**
   * Envía el mensaje al backend y recibe la respuesta completa formateada.
   * El backend devuelve un string plano con el texto formateado.
   */
  ask(text: string): Observable<string> {
    return new Observable<string>((observer) => {
      fetch(`${environment.apiBaseUrl}/ai/free/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      })
        .then((res) => {
          if (!res.ok) {
            observer.error(new Error(`HTTP ${res.status}`));
            return;
          }
          return res.text();
        })
        .then((responseText) => {
          if (responseText) {
            observer.next(responseText);
            observer.complete();
          } else {
            observer.error(new Error('Empty response'));
          }
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }
}