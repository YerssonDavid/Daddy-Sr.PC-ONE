import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from './chat-store';
import { environment } from '../../../environments/environment';

const BASE = environment.apiBaseUrl;

/** Parsea líneas SSE (`data: <texto>\n\n`) y devuelve el texto puro. */
function parseSseLine(line: string): string | null {
  // Líneas en blanco (separan eventos) o comentarios SSE: se ignoran.
  if (line === '' || line.startsWith(':')) return null;
  // Campo `data:` — se conserva el contenido tal cual (incluido el espacio
  // inicial del token). Hacerle trimStart era la causa de palabras pegadas
  // ("conGPU") al recomponer el stream por chunks.
  if (line.startsWith('data:')) return line.slice(5);
  return line; // fallback de texto plano por chunks
}

@Injectable({ providedIn: 'root' })
export class ChatApi {
  /**
   * Envía el mensaje al backend y emite chunks de texto conforme llegan.
   * El backend devuelve Flux<String> via text/event-stream.
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

          const pump = (): Promise<void> =>
            reader.read().then(({ done, value }) => {
              if (done) {
                // Procesa lo que quede en el buffer
                if (buffer.trim()) {
                  const text = parseSseLine(buffer.trim());
                  if (text) observer.next(text);
                }
                observer.complete();
                return;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() ?? ''; // la última línea puede estar incompleta

              for (const line of lines) {
                const text = parseSseLine(line);
                if (text !== null) observer.next(text);
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
