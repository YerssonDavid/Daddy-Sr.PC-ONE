import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { ChatMessage as ChatMessageModel } from '../state/chat-store';
import { SpecTable } from '../message-blocks/spec-table';
import { Admonition } from '../message-blocks/admonition';
import { CodeBlock } from '../message-blocks/code-block';
import { MdNormalizePipe, stripModelThinking } from './markdown.pipe';

@Component({
  selector: 'app-chat-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpecTable, Admonition, CodeBlock, DatePipe, MarkdownComponent, MdNormalizePipe],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessage {
  readonly message = input.required<ChatMessageModel>();

  protected readonly copied = signal(false);
  private copyTimer?: ReturnType<typeof setTimeout>;

  /** Copia el texto del mensaje (markdown crudo) al portapapeles. */
  copy(): void {
    const text = this.message()
      .blocks.map((b) => {
        if (b.kind === 'text' || b.kind === 'admonition') return stripModelThinking(b.text);
        if (b.kind === 'code') return b.code;
        return '';
      })
      .join('\n')
      .trim();

    navigator.clipboard?.writeText(text).catch(() => {});
    this.copied.set(true);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
  }
}
