import { Pipe, PipeTransform } from '@angular/core';

/**
 * Renderizador de Markdown ligero y SEGURO (sin dependencias).
 *
 * Estrategia de seguridad:
 *  1. El contenido del modelo se escapa como HTML ANTES de procesarlo.
 *  2. El parser solo añade etiquetas conocidas y seguras (strong, em, code,
 *     ul/ol/li, h3-h6, a[https], p, br, hr, pre).
 *  3. La salida se vincula con `[innerHTML]`, por lo que Angular vuelve a
 *     sanitizarla (defensa en profundidad).
 *
 * Soporta el subconjunto que devuelve el modelo: negritas, cursivas, código
 * en línea y en bloque, listas con/sin orden, encabezados, enlaces, reglas
 * horizontales y párrafos con saltos de línea.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Formato en línea sobre texto YA escapado como HTML. */
function inline(s: string): string {
  // Código en línea `code`
  s = s.replace(/`([^`]+)`/g, (_m, c) => `<code class="md-code">${c}</code>`);
  // Enlaces [texto](https://url) — solo http/https para evitar javascript:
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_m, t, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${t}</a>`,
  );
  // Negritas
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  // Cursivas (después de negritas para no chocar con **)
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_\w])_([^_\n]+)_/g, '$1<em>$2</em>');
  return s;
}

const PH_OPEN = '@@CODEBLOCK_';
const PH_CLOSE = '@@';

export function renderMarkdown(input: string): string {
  if (!input) return '';
  const src = input.replace(/\r\n?/g, '\n').trim();

  // 1) Proteger bloques de código cercados ```lang\n…```
  const codeBlocks: string[] = [];
  let text = src.replace(/```(\w*)\n?([\s\S]*?)```/g, (_m, lang: string, code: string) => {
    const escaped = escapeHtml(code.replace(/\n$/, ''));
    const cls = lang ? ` data-lang="${escapeHtml(lang)}"` : '';
    codeBlocks.push(`<pre class="md-pre"${cls}><code>${escaped}</code></pre>`);
    // Placeholder aislado en su propia línea con un token improbable.
    return `\n${PH_OPEN}${codeBlocks.length - 1}${PH_CLOSE}\n`;
  });

  // 2) Escapar el resto del contenido
  text = escapeHtml(text);

  // 3) Procesar a nivel de bloque
  const lines = text.split('\n');
  const out: string[] = [];
  let i = 0;

  const isPlaceholder = (l: string) => /^@@CODEBLOCK_\d+@@$/.test(l.trim());
  const isHeading = (l: string) => /^#{1,6}\s+/.test(l);
  const isUl = (l: string) => /^\s*[-*]\s+/.test(l);
  const isOl = (l: string) => /^\s*\d+[.)]\s+/.test(l);
  const isHr = (l: string) => /^\s*([-*_])(\s*\1){2,}\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (isPlaceholder(line)) {
      out.push(line.trim());
      i++;
      continue;
    }

    if (isHr(line)) {
      out.push('<hr class="md-hr">');
      i++;
      continue;
    }

    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = Math.min(h[1].length + 2, 6); // # -> h3
      out.push(`<h${level} class="md-h">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    if (isUl(line)) {
      const items: string[] = [];
      while (i < lines.length && isUl(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul class="md-ul">${items.join('')}</ul>`);
      continue;
    }

    if (isOl(line)) {
      const items: string[] = [];
      while (i < lines.length && isOl(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*\d+[.)]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol class="md-ol">${items.join('')}</ol>`);
      continue;
    }

    // Párrafo: acumula líneas hasta una línea en blanco u otro bloque
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !isHeading(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i]) &&
      !isHr(lines[i]) &&
      !isPlaceholder(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p class="md-p">${inline(para.join('\n')).replace(/\n/g, '<br>')}</p>`);
  }

  // 4) Reinsertar los bloques de código
  return out.join('').replace(/@@CODEBLOCK_(\d+)@@/g, (_m, n: string) => codeBlocks[+n]);
}

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return renderMarkdown(value ?? '');
  }
}
