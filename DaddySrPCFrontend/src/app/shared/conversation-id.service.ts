import { Injectable } from '@angular/core';

const STORAGE_KEY = 'daddy-conversation-id';

@Injectable({ providedIn: 'root' })
export class ConversationIdService {
  private id: string | null = null;

  get(): string {
    if (this.id) return this.id;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.id = stored;
      return stored;
    }

    const fresh = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, fresh);
    this.id = fresh;
    return fresh;
  }
}
