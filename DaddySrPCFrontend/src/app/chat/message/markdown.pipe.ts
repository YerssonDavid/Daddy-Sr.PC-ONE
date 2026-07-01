import { Pipe, PipeTransform } from '@angular/core';

/**
 * Elimina tags `<think>` del texto del modelo (pensamiento interno, no contenido).
 * No realiza ninguna otra normalización: deja que `ngx-markdown` renderice el markdown
 * exactamente como lo produce la IA, sin interferencias.
 */
export function stripModelThinking(input: string): string {
  return input
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
    .replace(/<\/think>/gi, '');
}

@Pipe({ name: 'mdNormalize' })
export class MdNormalizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return stripModelThinking(value ?? '');
  }
}