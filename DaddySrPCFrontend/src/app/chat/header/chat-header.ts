import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';
import { RequestCounter } from '../state/request-counter.service';
import { CHAT_AGENT_CONFIG } from '../state/chat-agent.config';

@Component({
  selector: 'app-chat-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggle, TranslocoPipe],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeader {
  readonly sidebarOpen = input(false);
  readonly toggleSidebar = output<void>();

  protected readonly counter = inject(RequestCounter);
  protected readonly agentConfig = inject(CHAT_AGENT_CONFIG);
}
