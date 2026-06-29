import { Pipe, PipeTransform } from '@angular/core';

export function stripModelThinking(input: string): string {
  return input
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
    .replace(/<\/think>/gi, '');
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isTableLikeLine(line: string): boolean {
  return /^\s*\|/.test(line.trim());
}

function normalizeSplitTableHeaders(input: string): string {
  const lines = input.split('\n');
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!isTableLikeLine(line) || isTableSeparator(line)) {
      out.push(line);
      continue;
    }

    const headerParts: string[] = [];
    let j = i;

    while (j < lines.length) {
      const current = lines[j].trim();

      if (current === '') {
        j++;
        continue;
      }

      if (isTableSeparator(current)) break;
      if (!isTableLikeLine(current)) break;

      headerParts.push(current.replace(/^\|\s*/, '').replace(/\s*\|$/, '').trim());
      j++;
    }

    if (headerParts.length > 1 && j < lines.length && isTableSeparator(lines[j])) {
      out.push(`| ${headerParts.join(' | ')} |`);
      out.push(lines[j]);
      i = j;
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

export function normalizeModelMarkdown(input: string): string {
  const normalized = stripModelThinking(input)
    .replace(/\r\n?/g, '\n')
    .replace(
      /([^\n])(?=\|\s*[^|\n]*(?:\n\s*)+\|\s*[^|\n]*(?:\n\s*)+\|\s*[^|\n]*\|?\s*\n\s*\|\s*:?-{3,}:?)/g,
      '$1\n\n',
    )
    .replace(/([^\n])(?=\|\s*[^|\n]+\s*\|\s*[^|\n]+\s*\|\s*\|\s*:?-{3,}:?)/g, '$1\n\n')
    .replace(/\|\s*\|(?=\s*(?:#{1,6}\s|\*\*|`|\[|[\p{L}\p{N}$~]))/gu, '|\n|')
    .replace(/\|\s*\|(?=\s*:?-{3,}:?\s*\|)/g, '|\n|')
    .replace(/([^\n])(?=#{1,6}\s)/g, '$1\n\n')
    .replace(/(#{1,6}\s+[^|\n]+)(?=\|)/g, '$1\n\n')
    .replace(/\|\s*(?=\|\s*:?-{3,}:?\s*\|)/g, '|\n')
    .replace(/([^\n])(?=\|[^\n]*\|\n\|\s*:?-{3,}:?\s*)/g, '$1\n\n')
    .replace(/(\|[^\n]*\|)(?=#{1,6}\s)/g, '$1\n\n')
    .replace(/([.!?])(?=\s*#{1,6}\s)/g, '$1\n\n')
    .replace(/^#\s*$/gm, '')
    .replace(/(#{1,6}\s+[^\n#|*]+)(?=\*\*)/g, '$1\n\n')
    .replace(/(\*\*)(?=\s*[-*]\s+)/g, '$1\n')
    .replace(/([^\n])(?=\*\*Donde\b)/g, '$1\n\n')
    .replace(/([^\n])(?=\s*(?:[-*]|\d+[.)])\s+)/g, (match, before: string) => {
      return /[:.!?)]/.test(before) ? `${before}\n` : match;
    })
    .trim();

  return normalizeSplitTableHeaders(normalized).trim();
}

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return normalizeModelMarkdown(value ?? '');
  }
}
