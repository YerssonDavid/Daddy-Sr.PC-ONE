import { computed, Injectable, signal } from '@angular/core';

const LS_KEY = 'daddy-requests';
const LS_TS_KEY = 'daddy-requests-ts';
const TOTAL = 25;
const RESET_INTERVAL_MS = 60_000;

@Injectable({ providedIn: 'root' })
export class RequestCounter {
  readonly total = TOTAL;
  readonly remaining = signal(this.loadRemaining());

  /** 'none' | 'soft' (≤8, >1) | 'strong' (==1) */
  readonly notice = computed<'none' | 'soft' | 'strong'>(() => {
    const r = this.remaining();
    if (r === 1) return 'strong';
    if (r <= 8 && r > 1) return 'soft';
    return 'none';
  });

  readonly depleted = computed(() => this.remaining() === 0);

  constructor() {
    setInterval(() => this.reset(), RESET_INTERVAL_MS);
  }

  consume(): boolean {
    if (this.remaining() === 0) return false;
    this.remaining.update((r) => r - 1);
    this.persist();
    return true;
  }

  reset(): void {
    this.remaining.set(TOTAL);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(LS_KEY, String(this.remaining()));
      localStorage.setItem(LS_TS_KEY, String(Date.now()));
    } catch { /* ignore */ }
  }

  private loadRemaining(): number {
    try {
      const ts = parseInt(localStorage.getItem(LS_TS_KEY) ?? '', 10);
      if (!isNaN(ts) && Date.now() - ts >= RESET_INTERVAL_MS) return TOTAL;
      const v = parseInt(localStorage.getItem(LS_KEY) ?? '', 10);
      if (!isNaN(v) && v >= 0 && v <= TOTAL) return v;
    } catch { /* ignore */ }
    return TOTAL;
  }
}
