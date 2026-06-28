import { computed, Injectable, signal } from '@angular/core';

export type Role = 'user' | 'agent';
export type Level = 'novato' | 'intermedio' | 'avanzado';

export type MessageBlock =
  | { kind: 'text'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'admonition'; tone: 'warn' | 'info'; text: string }
  | { kind: 'code'; lang: string; code: string };

export interface ChatMessage {
  id: string;
  role: Role;
  blocks: MessageBlock[];
  createdAt: number;
  pending?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

const LS_KEY = 'daddy-chat-state';

function uuid(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

@Injectable({ providedIn: 'root' })
export class ChatStore {
  private readonly _conversations = signal<Conversation[]>([]);
  private readonly _activeId = signal<string | null>(null);

  readonly typing = signal(false);
  readonly level = signal<Level>('intermedio');

  readonly conversations = this._conversations.asReadonly();
  readonly active = computed(
    () => this._conversations().find((c) => c.id === this._activeId()) ?? null,
  );
  readonly messages = computed(() => this.active()?.messages ?? []);

  constructor() {
    this.loadFromStorage();
    if (this._conversations().length === 0) {
      this.newConversation();
    }
  }

  newConversation(): void {
    const conv: Conversation = {
      id: uuid(),
      title: 'Nueva conversación',
      messages: [],
      updatedAt: Date.now(),
    };
    this._conversations.update((cs) => [conv, ...cs]);
    this._activeId.set(conv.id);
    this.persist();
  }

  setActive(id: string): void {
    this._activeId.set(id);
  }

  appendUser(text: string): void {
    const msg: ChatMessage = {
      id: uuid(),
      role: 'user',
      blocks: [{ kind: 'text', text }],
      createdAt: Date.now(),
    };
    this.pushMessage(msg);

    // Auto-title: use first user message truncated
    const conv = this.active();
    if (conv && conv.messages.length <= 1) {
      const title = text.length > 36 ? text.slice(0, 35) + '…' : text;
      this._conversations.update((cs) =>
        cs.map((c) => (c.id === conv.id ? { ...c, title } : c)),
      );
    }
  }

  /** Crea un mensaje agente vacío en streaming y devuelve su id. */
  startAgentStream(): string {
    const id = uuid();
    const msg: ChatMessage = {
      id,
      role: 'agent',
      blocks: [{ kind: 'text', text: '' }],
      createdAt: Date.now(),
      pending: true,
    };
    this.pushMessage(msg);
    return id;
  }

  /** Acumula un chunk de texto sobre el mensaje en streaming. */
  appendChunk(id: string, chunk: string): void {
    const activeId = this._activeId();
    if (!activeId) return;
    this._conversations.update((cs) =>
      cs.map((c) => {
        if (c.id !== activeId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => {
            if (m.id !== id) return m;
            const prev = m.blocks[0] as { kind: 'text'; text: string };
            return { ...m, blocks: [{ kind: 'text' as const, text: prev.text + chunk }] };
          }),
        };
      }),
    );
  }

  /** Marca el mensaje como finalizado y persiste. */
  finalizeStream(id: string): void {
    const activeId = this._activeId();
    if (!activeId) return;
    this._conversations.update((cs) =>
      cs.map((c) => {
        if (c.id !== activeId) return c;
        return {
          ...c,
          messages: c.messages.map((m) =>
            m.id === id ? { ...m, pending: false } : m,
          ),
          updatedAt: Date.now(),
        };
      }),
    );
    this.persist();
  }

  deleteConversation(id: string): void {
    this._conversations.update((cs) => cs.filter((c) => c.id !== id));
    if (this._activeId() === id) {
      const remaining = this._conversations();
      this._activeId.set(remaining[0]?.id ?? null);
      if (remaining.length === 0) this.newConversation();
    }
    this.persist();
  }

  private pushMessage(msg: ChatMessage): void {
    const activeId = this._activeId();
    if (!activeId) return;
    this._conversations.update((cs) =>
      cs.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
          : c,
      ),
    );
    this.persist();
  }

  private persist(): void {
    try {
      const data = {
        conversations: this._conversations().slice(0, 20), // keep last 20
        activeId: this._activeId(),
      };
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as { conversations: Conversation[]; activeId: string | null };
      if (Array.isArray(data.conversations)) {
        this._conversations.set(data.conversations);
        this._activeId.set(data.activeId);
      }
    } catch {
      /* ignore corrupted data */
    }
  }
}
