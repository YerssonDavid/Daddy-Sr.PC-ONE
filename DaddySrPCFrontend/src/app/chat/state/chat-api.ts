import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from './chat-store';
import { environment } from '../../../environments/environment';

const BASE = environment.apiBaseUrl;

/**
 * Extrae el valor de un campo `data:` preservando el contenido tal cual
 * (incluido el espacio inicial del token). Hacerle trimStart era la causa de
 * palabras pegadas ("conGPU") al recomponer el stream por chunks.
 */
function extractDataValue(line: string): string {
  return line.slice(5);
}

@Injectable({ providedIn: 'root' })
export class ChatApi {
  /**
   * Envía el mensaje al backend y emite chunks de texto conforme llegan.
   * El backend devuelve Flux<String> via text/event-stream.
   *
   * El parser SSE acumula las líneas `data:` de un mismo evento y las une
   * con `\n` para preservar los saltos de línea (esenciales para que el
   * markdown se renderice correctamente: listas, tablas, encabezados, etc.).
   */
  ask(input: { text: string; level: Level; conversationId?: number }): Observable<string> {
    const conversationId = input.conversationId ?? 1;

    return new Observable<string>((observer) => {
      const controller = new AbortController();

      fetch(`${BASE}/ask?conversationId=${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ question: input.text }),
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            observer.error(new Error(`HTTP ${res.status}`));
            return;
          }

          const reader = res.body!.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let dataLines: string[] = [];

          const flushEvent = (): void => {
            if (dataLines.length > 0) {
              observer.next(dataLines.join('\n'));
              dataLines = [];
            }
          };

          const processLine = (line: string): void => {
            if (line === '') {
              flushEvent();
              return;
            }
            if (line.startsWith(':')) return;
            if (line.startsWith('data:')) {
              dataLines.push(extractDataValue(line));
              return;
            }
            // Fallback de texto plano por chunks (no SSE estricto):
            // se emite directamente como un evento.
            dataLines.push(line);
          };

          const pump = (): Promise<void> =>
            reader.read().then(({ done, value }) => {
              if (done) {
                if (buffer) processLine(buffer);
                buffer = '';
                flushEvent();
                observer.complete();
                return;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() ?? ''; // la última línea puede estar incompleta

              for (const line of lines) {
                processLine(line);
              }

              return pump();
            });

          pump().catch((err) => {
            if (err?.name !== 'AbortError') observer.error(err);
          });
        })
        .catch((err) => {
          if (err?.name !== 'AbortError') observer.error(err);
        });

      // Cancelación cuando el subscriber se desuscribe
      return () => controller.abort();
    });
  }
}
