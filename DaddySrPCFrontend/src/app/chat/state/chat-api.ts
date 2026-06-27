import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Level, MessageBlock } from './chat-store';
import { TranslocoService } from '@jsverse/transloco';

const REPLY_KEYS = ['r1', 'r2'] as const;

/** Fachada HTTP mockeable — v1 usa respuestas simuladas del i18n (idéntico a live-demo) */
@Injectable({ providedIn: 'root' })
export class ChatApi {
  private readonly transloco = inject(TranslocoService);

  /**
   * Simula la respuesta del agente con un delay de 900ms.
   * En producción se reemplazaría con un SSE/stream real.
   */
  ask(input: { text: string; level: Level }): Observable<MessageBlock[]> {
    const key = REPLY_KEYS[Math.floor(Math.random() * REPLY_KEYS.length)];
    const replyText = this.transloco.translate(
      `demo.replies.${input.level}.${key}`,
    );
    const blocks: MessageBlock[] = [{ kind: 'text', text: replyText }];
    return of(blocks).pipe(delay(900));
  }
}
