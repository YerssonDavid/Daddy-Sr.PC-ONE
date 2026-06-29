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
}

const LANGS: Lang[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
];

const LS_KEY = 'daddy-lang';

/**
 * Selector de idioma. Las banderas se renderizan como SVG inline (no como
 * archivos externos) para que siempre se muestren, sin peticiones de red ni
 * dependencias de rutas de assets. Todas usan un viewBox 3×2 uniforme para
 * mantener un tamaño y radio consistentes.
 */
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
          @switch (lang.code) {
            @case ('es') {
              <svg class="langs__flag" viewBox="0 0 3 2" aria-hidden="true">
                <rect width="3" height="2" fill="#FCD116" />
                <rect y="1" width="3" height="1" fill="#003893" />
                <rect y="1.5" width="3" height=".5" fill="#CE1126" />
              </svg>
            }
            @case ('en') {
              <svg class="langs__flag" viewBox="0 0 3 2" aria-hidden="true">
                <rect width="3" height="2" fill="#B22234" />
                <g fill="#fff">
                  <rect y=".154" width="3" height=".154" />
                  <rect y=".462" width="3" height=".154" />
                  <rect y=".769" width="3" height=".154" />
                  <rect y="1.077" width="3" height=".154" />
                  <rect y="1.385" width="3" height=".154" />
                  <rect y="1.692" width="3" height=".154" />
                </g>
                <rect width="1.2" height="1.077" fill="#3C3B6E" />
                <g fill="#fff">
                  <circle cx=".24" cy=".22" r=".07" />
                  <circle cx=".54" cy=".22" r=".07" />
                  <circle cx=".84" cy=".22" r=".07" />
                  <circle cx="1.04" cy=".22" r=".07" />
                  <circle cx=".24" cy=".54" r=".07" />
                  <circle cx=".54" cy=".54" r=".07" />
                  <circle cx=".84" cy=".54" r=".07" />
                  <circle cx="1.04" cy=".54" r=".07" />
                  <circle cx=".24" cy=".86" r=".07" />
                  <circle cx=".54" cy=".86" r=".07" />
                  <circle cx=".84" cy=".86" r=".07" />
                  <circle cx="1.04" cy=".86" r=".07" />
                </g>
              </svg>
            }
            @case ('pt') {
              <svg class="langs__flag" viewBox="0 0 3 2" aria-hidden="true">
                <rect width="3" height="2" fill="#009C3B" />
                <path d="M1.5 .18 L2.72 1 L1.5 1.82 L.28 1 Z" fill="#FFDF00" />
                <circle cx="1.5" cy="1" r=".5" fill="#002776" />
              </svg>
            }
          }
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
        width: 24px;
        height: 16px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
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
