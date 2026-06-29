import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ChatStore, Conversation } from '../state/chat-store';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-chat-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggle, TranslocoPipe],
  templateUrl: './chat-sidebar.html',
  styleUrl: './chat-sidebar.scss',
})
export class ChatSidebar {
  readonly collapsed = input(false);
  readonly toggle = output<void>();
  readonly settingsOpen = output<void>();

  protected readonly store = inject(ChatStore);

  newChat(): void {
    this.store.newConversation();
  }

  selectConversation(conv: Conversation): void {
    this.store.setActive(conv.id);
  }

  deleteConversation(event: Event, id: string): void {
    event.stopPropagation();
    this.store.deleteConversation(id);
  }

  isActive(id: string): boolean {
    return this.store.active()?.id === id;
  }

  formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' });
  }
}
