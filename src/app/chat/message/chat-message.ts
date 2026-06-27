import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatMessage as ChatMessageModel } from '../state/chat-store';
import { SpecTable } from '../message-blocks/spec-table';
import { Admonition } from '../message-blocks/admonition';
import { CodeBlock } from '../message-blocks/code-block';

@Component({
  selector: 'app-chat-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpecTable, Admonition, CodeBlock, DatePipe],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessage {
  readonly message = input.required<ChatMessageModel>();
}
