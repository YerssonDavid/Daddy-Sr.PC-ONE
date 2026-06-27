import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
    loadComponent: () => import('./chat/chat').then((m) => m.ChatPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
