import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

/**
 * Maneja el tema dark/light (plan §11).
 * - Persiste en localStorage.
 * - Respeta prefers-color-scheme en el primer load (sin override del usuario).
 * - El atributo data-theme en <html> dispara las variables CSS.
 *
 * El valor inicial ya se aplica al <html> mediante un script inline en
 * index.html para evitar FOUC; aquí solo lo sincronizamos con la app.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    // Sincroniza el atributo del documento cuando cambia el signal.
    effect(() => {
      const value = this.theme();
      document.documentElement.setAttribute('data-theme', value);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
    this.persist();
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, this.theme());
    } catch {
      /* almacenamiento no disponible — ignorar */
    }
  }

  private readInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      /* ignore */
    }
    const prefersLight =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
}
