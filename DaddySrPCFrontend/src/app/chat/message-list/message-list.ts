import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ChatMessage as ChatMessageModel } from '../state/chat-store';
import { CHAT_AGENT_CONFIG } from '../state/chat-agent.config';
import { ChatMessage } from '../message/chat-message';

@Component({
  selector: 'app-message-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatMessage, TranslocoPipe],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  readonly messages = input.required<ChatMessageModel[]>();
  readonly typing = input(false);
  readonly suggestionClick = output<string>();

  private readonly transloco = inject(TranslocoService);
  protected readonly agentConfig = inject(CHAT_AGENT_CONFIG);

  protected selectSuggestion(key: string): void {
    const text = this.transloco.translate(key);
    this.suggestionClick.emit(text);
  }

  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  /** Margen (px) desde el fondo dentro del cual se considera "pegado" al final. */
  private static readonly STICK_THRESHOLD = 120;

  /** El stream sigue al texto nuevo solo si el usuario está pegado al fondo. */
  private stick = true;
  /** Nº de mensajes del render previo, para distinguir un mensaje nuevo del stream. */
  private lastCount = 0;

  constructor() {
    // Detecta si el usuario se separó del fondo. Listener pasivo: no dispara
    // change detection (app zoneless) y solo lee la posición de scroll.
    afterNextRender(() => {
      const el = this.scroller()?.nativeElement;
      if (!el) return;
      el.addEventListener(
        'scroll',
        () => {
          this.stick =
            el.scrollHeight - el.scrollTop - el.clientHeight < MessageList.STICK_THRESHOLD;
        },
        { passive: true },
      );
    });

    // Auto-scroll inteligente: baja al fondo cuando llega un mensaje nuevo (el
    // usuario acaba de enviar), pero durante el streaming solo sigue al texto si
    // el usuario sigue pegado al final. Así puede leer hacia arriba sin saltos.
    effect(() => {
      const count = this.messages().length;
      this.typing();
      const hasNewMessage = count > this.lastCount;
      this.lastCount = count;

      if (!hasNewMessage && !this.stick) return;

      queueMicrotask(() => {
        const el = this.scroller()?.nativeElement;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
        this.stick = true;
      });
    });
  }
}
