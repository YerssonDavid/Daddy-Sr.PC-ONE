import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
 * Selector de idioma tipo burger dropdown.
 * Muestra la bandera del idioma actual + chevron. Al hacer clic,
 * se despliega la lista de todos los idiomas.
 */
@Component({
  selector: 'app-lang-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lang-selector" #container>
      <button
        type="button"
        class="lang-trigger"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="current().label"
      >
        @switch (current().code) {
          @case ('es') {
            <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
              <rect width="3" height="2" fill="#FCD116" />
              <rect y="1" width="3" height="1" fill="#003893" />
              <rect y="1.5" width="3" height=".5" fill="#CE1126" />
            </svg>
          }
          @case ('en') {
            <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
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
            <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
              <rect width="3" height="2" fill="#009C3B" />
              <path d="M1.5 .18 L2.72 1 L1.5 1.82 L.28 1 Z" fill="#FFDF00" />
              <circle cx="1.5" cy="1" r=".5" fill="#002776" />
            </svg>
          }
        }
        <svg class="lang-chevron" viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </button>

      @if (open()) {
        <div class="lang-dropdown" role="listbox" aria-label="Seleccionar idioma">
          @for (lang of langs; track lang.code) {
            <button
              type="button"
              class="lang-option"
              [class.is-active]="lang.code === current().code"
              (click)="select(lang)"
              role="option"
              [attr.aria-selected]="lang.code === current().code"
            >
              @switch (lang.code) {
                @case ('es') {
                  <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
                    <rect width="3" height="2" fill="#FCD116" />
                    <rect y="1" width="3" height="1" fill="#003893" />
                    <rect y="1.5" width="3" height=".5" fill="#CE1126" />
                  </svg>
                }
                @case ('en') {
                  <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
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
                  <svg class="lang-flag" viewBox="0 0 3 2" aria-hidden="true">
                    <rect width="3" height="2" fill="#009C3B" />
                    <path d="M1.5 .18 L2.72 1 L1.5 1.82 L.28 1 Z" fill="#FFDF00" />
                    <circle cx="1.5" cy="1" r=".5" fill="#002776" />
                  </svg>
                }
              }
              <span class="lang-label">{{ lang.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .lang-selector {
        position: relative;
        display: inline-flex;
      }

      .lang-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        background: var(--bg-surface);
        cursor: pointer;
        transition:
          border-color var(--t-fast) var(--ease),
          background-color var(--t-fast) var(--ease);
      }
      .lang-trigger:hover {
        border-color: var(--trace);
        background: var(--bg-elevated);
      }

      .lang-chevron {
        color: var(--text-muted);
        transition: transform var(--t-fast) var(--ease);
      }

      .lang-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.375rem;
        min-width: 150px;
        background: var(--bg-surface);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        z-index: 60;
        padding: 0.25rem;
        animation: drop-in 0.15s var(--ease) both;
      }

      .lang-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem 0.625rem;
        border: none;
        border-radius: calc(var(--radius) - 2px);
        background: transparent;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: var(--fs-small);
        cursor: pointer;
        transition: background-color var(--t-fast) var(--ease);
      }
      .lang-option:hover {
        background: var(--bg-elevated);
      }
      .lang-option.is-active {
        background: var(--trace-tint);
      }

      .lang-flag {
        display: block;
        width: 22px;
        height: 15px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
        pointer-events: none;
        flex-shrink: 0;
      }

      .lang-label {
        white-space: nowrap;
      }

      @keyframes drop-in {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
    `,
  ],
})
export class LangSelector implements OnInit {
  protected readonly langs = LANGS;
  protected readonly current = signal<Lang>(LANGS[0]);
  protected readonly open = signal(false);

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

  toggle(): void {
    this.open.update((v) => !v);
  }

  select(lang: Lang): void {
    this.current.set(lang);
    this.transloco.setActiveLang(lang.code);
    localStorage.setItem(LS_KEY, lang.code);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.open()) return;
    const host = (event.target as HTMLElement).closest('app-lang-selector');
    if (!host) {
      this.open.set(false);
    }
  }
}