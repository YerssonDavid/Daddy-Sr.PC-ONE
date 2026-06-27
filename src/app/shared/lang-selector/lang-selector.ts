import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

interface Lang {
  code: string;
  label: string;
  img: string;
}

const LANGS: Lang[] = [
  { code: 'es', label: 'Español',   img: 'flags/co.svg' },
  { code: 'en', label: 'English',   img: 'flags/us.svg' },
  { code: 'pt', label: 'Português', img: 'flags/br.svg' },
];

const LS_KEY = 'daddy-lang';

@Component({
  selector: 'app-lang-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="langs" role="group" aria-label="Seleccionar idioma">
      @for (lang of langs; track lang.code) {
        <button
          type="button"
          class="langs__btn"
          [class.is-active]="lang.code === current().code"
          [attr.aria-pressed]="lang.code === current().code"
          [attr.title]="lang.label"
          [attr.aria-label]="lang.label"
          (click)="select(lang)"
        >
          <img
            class="langs__flag"
            [src]="lang.img"
            [alt]="lang.label"
            width="24"
            height="16"
            loading="eager"
          />
        </button>
      }
    </div>
  `,
  styles: [
    `
      .langs {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        background: var(--bg-surface);
      }

      .langs__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: calc(var(--radius) - 3px);
        cursor: pointer;
        transition:
          background-color var(--t-fast) var(--ease),
          box-shadow var(--t-fast) var(--ease),
          transform var(--t-fast) var(--ease);
      }
      .langs__btn:hover {
        background: var(--bg-elevated);
        transform: scale(1.08);
      }
      .langs__btn.is-active {
        background: var(--bg-elevated);
        box-shadow:
          0 0 0 1.5px var(--trace),
          0 0 6px color-mix(in srgb, var(--trace) 35%, transparent);
      }

      .langs__flag {
        display: block;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(255,255,255,.1);
        pointer-events: none;
      }
    `,
  ],
})
export class LangSelector implements OnInit {
  protected readonly langs = LANGS;
  protected readonly current = signal<Lang>(LANGS[0]);

  private readonly transloco = inject(TranslocoService);

  ngOnInit(): void {
    const saved = localStorage.getItem(LS_KEY);
    const found =
      LANGS.find((l) => l.code === saved) ??
      LANGS.find((l) => l.code === this.transloco.getActiveLang()) ??
      LANGS[0];
    this.current.set(found);
    this.transloco.setActiveLang(found.code);
  }

  select(lang: Lang): void {
    this.current.set(lang);
    this.transloco.setActiveLang(lang.code);
    localStorage.setItem(LS_KEY, lang.code);
  }
}
