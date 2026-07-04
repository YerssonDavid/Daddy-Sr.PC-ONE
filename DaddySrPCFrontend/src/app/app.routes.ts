import { Routes } from '@angular/router';
import { ChatStore } from './chat/state/chat-store';
import { ChatApi } from './chat/state/chat-api';
import {
  CHAT_STORAGE_KEY,
  CHAT_API_ENDPOINT,
  CHAT_AGENT_CONFIG,
  type ChatAgentConfig,
} from './chat/state/chat-agent.config';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./landing/landing').then((m) => m.LandingPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then((m) => m.Login),
  },
  {
    path: 'chat',
    providers: [ChatStore, ChatApi],
    loadComponent: () => import('./chat/chat').then((m) => m.ChatPage),
  },
  {
    path: 'chat/support',
    providers: [
      ChatStore,
      ChatApi,
      { provide: CHAT_STORAGE_KEY, useValue: 'daddy-support-chat-state' },
      { provide: CHAT_API_ENDPOINT, useValue: '/ask/support' },
      {
        provide: CHAT_AGENT_CONFIG,
        useValue: {
          name: 'chat.supportAgentName',
          logo: 'img/customer-service-logo.png',
          statusKey: 'chat.supportAgentStatus',
          emptyTitleKey: 'chat.supportEmptyTitle',
          emptySubKey: 'chat.supportEmptySub',
          suggestionKeys: [
            'chat.supportSuggestion1',
            'chat.supportSuggestion2',
            'chat.supportSuggestion3',
            'chat.supportSuggestion4',
          ],
          showEmptyLogo: false,
          floatingHeader: true,
        } satisfies ChatAgentConfig,
      },
    ],
    loadComponent: () => import('./chat/chat').then((m) => m.ChatPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
