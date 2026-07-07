import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConversationIdService } from '../../shared/conversation-id.service';

@Injectable({ providedIn: 'root' })
export class LiveDemoApi {
  private readonly conversationId = inject(ConversationIdService);

  /**
   * Envía el mensaje al backend y recibe la respuesta completa formateada.
   * El backend devuelve un string plano con el texto formateado.
   */
  ask(text: string): Observable<string> {
    const cid = this.conversationId.get();
    return new Observable<string>((observer) => {
      fetch(`${environment.apiBaseUrl}/ai/free/user?conversationId=${cid}`, {
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