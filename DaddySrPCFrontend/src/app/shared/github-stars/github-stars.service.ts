import { Injectable, signal } from '@angular/core';

const REPO_OWNER = 'YerssonDavid';
const REPO_NAME = 'Daddy-Sr.PC-ONE';
const CACHE_KEY = 'gh-stars';

@Injectable({ providedIn: 'root' })
export class GithubStars {
  readonly count = signal<number | null>(null);

  constructor() {
    const saved = this.#load();
    if (saved !== null) {
      this.count.set(saved);
    } else {
      this.count.set(0);
    }
    this.#fetch();
  }

  async #fetch(): Promise<void> {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
        { headers: { Accept: 'application/vnd.github.v3+json' } },
      );
      if (!res.ok) return;
      const data: { stargazers_count: number } = await res.json();
      this.count.set(data.stargazers_count);
      this.#save(data.stargazers_count);
    } catch {
      /* usa el valor actual (caché o 0) */
    }
  }

  #save(n: number): void {
    try {
      localStorage.setItem(CACHE_KEY, String(n));
    } catch {
      /* ignorar */
    }
  }

  #load(): number | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw === null) return null;
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    } catch {
      return null;
    }
  }
}