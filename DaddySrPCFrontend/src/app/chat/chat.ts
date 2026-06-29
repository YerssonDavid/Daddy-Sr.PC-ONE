import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ChatGrid } from './chat-grid/chat-grid';
import { ChatSidebar } from './sidebar/chat-sidebar';
import { ChatHeader } from './header/chat-header';
import { MessageList } from './message-list/message-list';
import { ChatComposer } from './composer/chat-composer';
import { RegisterGate } from './gate/register-gate';
import { SettingsPanel } from './settings-panel/settings-panel';
import { ChatStore } from './state/chat-store';
import { RequestCounter } from './state/request-counter.service';
import { ChatApi } from './state/chat-api';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatGrid, ChatSidebar, ChatHeader, MessageList, ChatComposer, RegisterGate, SettingsPanel, TranslocoPipe],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class ChatPage {
  protected readonly store = inject(ChatStore);
  protected readonly counter = inject(RequestCounter);
  private readonly api = inject(ChatApi);
  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly sidebarOpen = signal(false);
  protected readonly sidebarCollapsed = signal(false);
  protected readonly showSettings = signal(false);
  protected readonly showDepletedGate = signal(false);

  constructor() {
    // El gate aparece al agotar las consultas y se cierra solo al restablecerse.
    effect(() => this.showDepletedGate.set(this.counter.depleted()));
  }

  onSend(text: string): void {
    // Evita envíos concurrentes mientras el agente responde.
    if (this.store.typing()) return;

    // Descuenta del cupo de consultas gratuitas; si está agotado, muestra el gate.
    if (!this.counter.consume()) {
      this.showDepletedGate.set(true);
      return;
    }

    this.store.appendUser(text);
    this.store.typing.set(true);

    const streamId = this.store.startAgentStream();

    this.api
      .ask({ text, level: this.store.level() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (chunk) => {
          this.store.appendChunk(streamId, chunk);
        },
        error: () => {
          this.store.typing.set(false);
          this.store.appendChunk(streamId, this.transloco.translate('chat.errorConnect'));
          this.store.finalizeStream(streamId);
        },
        complete: () => {
          this.store.typing.set(false);
          this.store.finalizeStream(streamId);
        },
      });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  collapseToggle(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}
