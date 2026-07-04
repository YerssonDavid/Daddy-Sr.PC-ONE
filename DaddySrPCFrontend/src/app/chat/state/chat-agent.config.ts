import { InjectionToken } from '@angular/core';

export const CHAT_STORAGE_KEY = new InjectionToken<string>('CHAT_STORAGE_KEY', {
  providedIn: 'root',
  factory: () => 'daddy-chat-state',
});

export const CHAT_API_ENDPOINT = new InjectionToken<string>('CHAT_API_ENDPOINT', {
  providedIn: 'root',
  factory: () => '/ask',
});

export interface ChatAgentConfig {
  name: string;
  logo: string;
  statusKey: string;
  emptyTitleKey: string;
  emptySubKey: string;
  suggestionKeys: [string, string, string, string];
  showEmptyLogo?: boolean;
}

export const CHAT_AGENT_CONFIG = new InjectionToken<ChatAgentConfig>('CHAT_AGENT_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    name: 'Daddy Sr.PC',
    logo: 'logo.png',
    statusKey: 'chat.agentStatus',
    emptyTitleKey: 'chat.emptyTitle',
    emptySubKey: 'chat.emptySub',
    suggestionKeys: [
      'chat.suggestion1',
      'chat.suggestion2',
      'chat.suggestion3',
      'chat.suggestion4',
    ],
    showEmptyLogo: true,
  }),
});
