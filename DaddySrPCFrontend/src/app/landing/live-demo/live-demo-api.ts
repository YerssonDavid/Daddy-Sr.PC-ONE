import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LiveDemoApi {
  /**
   * Envía el mensaje al backend y recibe la respuesta completa formateada.
   * El backend devuelve un JSON con el campo 'response' que contiene el texto formateado.
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
          return res.json();
        })
        .then((data) => {
          if (data && data.response) {
            observer.next(data.response);
            observer.complete();
          } else {
            observer.error(new Error('Invalid response format'));
          }
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }
}