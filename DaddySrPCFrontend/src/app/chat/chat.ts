import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
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
  private readonly destroyRef = inject(DestroyRef);

  protected readonly sidebarOpen = signal(false);
  protected readonly sidebarCollapsed = signal(false);
  protected readonly showSettings = signal(false);
  protected readonly showDepletedGate = signal(false);

  constructor() {
    // Muestra el gate automáticamente cuando se agotan los requests;
    // lo cierra automáticamente cuando el contador se restablece.
    effect(() => {
      if (this.counter.depleted()) {
        this.showDepletedGate.set(true);
      } else {
        this.showDepletedGate.set(false);
      }
    });
  }

  onSend(text: string): void {
    if (!this.counter.consume()) return;

    this.store.appendUser(text);
    this.store.typing.set(true);

    this.api
      .ask({ text, level: this.store.level() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blocks) => {
          this.store.appendAgent(blocks);
          this.store.typing.set(false);
        },
        error: () => {
          this.store.appendAgent([{
            kind: 'text',
            text: 'Hubo un error al conectar con Daddy. Intentalo de nuevo.',
          }]);
          this.store.typing.set(false);
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
