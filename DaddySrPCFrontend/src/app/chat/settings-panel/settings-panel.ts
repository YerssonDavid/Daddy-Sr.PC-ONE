import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../core/theme.service';
import { LangSelector } from '../../shared/lang-selector/lang-selector';

const LS_COLOR_KEY = 'daddy-color';
const DEFAULT_COLOR = '#3DDC97';

@Component({
  selector: 'app-settings-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LangSelector, TranslocoPipe],
  template: `
    <div
      class="settings-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      (keydown.escape)="close.emit()"
      (click)="onBackdropClick($event)"
    >
      <div class="settings-card" #card tabindex="-1">

        <div class="settings-header">
          <p class="settings-eyebrow eyebrow">{{ 'chat.settingsEyebrow' | transloco }}</p>
          <button
            type="button"
            class="settings-close-btn"
            (click)="close.emit()"
            aria-label="Cerrar ajustes"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <h2 class="settings-title" id="settings-title">{{ 'chat.settingsTitle' | transloco }}</h2>

        <!-- Idioma -->
        <section class="settings-section">
          <p class="settings-label">{{ 'chat.settingsLanguage' | transloco }}</p>
          <app-lang-selector />
        </section>

        <!-- Color principal -->
        <section class="settings-section">
          <p class="settings-label">{{ 'chat.settingsColor' | transloco }}</p>
          <div class="settings-color-row">
            <label class="settings-color-preview" [style.background]="primaryColor()">
              <input
                type="color"
                class="settings-color-input"
                [value]="primaryColor()"
                (input)="onColorChange($event)"
                [attr.aria-label]="'chat.settingsColor' | transloco"
              />
            </label>
            <span class="settings-color-value mono">{{ primaryColor() }}</span>
            <button
              type="button"
              class="settings-reset-btn"
              (click)="resetColor()"
              [attr.aria-label]="'chat.settingsRestore' | transloco"
            >{{ 'chat.settingsRestore' | transloco }}</button>
          </div>
        </section>

        <!-- Modo claro / oscuro -->
        <section class="settings-section">
          <p class="settings-label">{{ 'chat.settingsAppearance' | transloco }}</p>
          <div class="settings-theme-row" role="group" [attr.aria-label]="'chat.settingsAppearance' | transloco">
            <button
              type="button"
              class="settings-theme-btn"
              [class.settings-theme-btn--active]="theme.theme() === 'light'"
              [attr.aria-pressed]="theme.theme() === 'light'"
              (click)="theme.set('light')"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/>
                <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
                  <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/>
                </g>
              </svg>
              {{ 'chat.settingsLight' | transloco }}
            </button>
            <button
              type="button"
              class="settings-theme-btn"
              [class.settings-theme-btn--active]="theme.theme() === 'dark'"
              [attr.aria-pressed]="theme.theme() === 'dark'"
              (click)="theme.set('dark')"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
                  stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              </svg>
              {{ 'chat.settingsDark' | transloco }}
            </button>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .settings-backdrop {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: color-mix(in srgb, var(--bg-base) 65%, transparent);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      animation: fade-up 0.3s var(--ease) both;
    }

    .settings-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      max-width: 400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.4),
        0 0 0 1px var(--glass-border),
        0 0 40px var(--solder-tint);
      outline: none;
    }

    .settings-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .settings-eyebrow {
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);
      color: var(--trace);
      letter-spacing: 0.1em;
    }

    .settings-close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition:
        color var(--t-fast) var(--ease),
        border-color var(--t-fast) var(--ease),
        background-color var(--t-fast) var(--ease);

      &:hover {
        color: var(--alert);
        border-color: var(--alert);
        background: var(--alert-tint);
      }
    }

    .settings-title {
      font-family: var(--font-display);
      font-size: var(--fs-h3);
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
      margin-top: -0.5rem;
    }

    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .settings-label {
      font-size: var(--fs-small);
      font-weight: 500;
      color: var(--text-secondary);
    }

    /* Color picker */
    .settings-color-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .settings-color-preview {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      border: 2px solid var(--border);
      cursor: pointer;
      display: block;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      transition: border-color var(--t-fast) var(--ease);

      &:hover { border-color: var(--text-secondary); }
    }

    .settings-color-input {
      position: absolute;
      inset: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      opacity: 0;
      cursor: pointer;
      border: none;
      padding: 0;
    }

    .settings-color-value {
      flex: 1;
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);
      color: var(--text-secondary);
    }

    .settings-reset-btn {
      padding: 0.3rem 0.625rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text-muted);
      font-size: var(--fs-tiny);
      cursor: pointer;
      flex-shrink: 0;
      transition:
        color var(--t-fast) var(--ease),
        border-color var(--t-fast) var(--ease);

      &:hover {
        color: var(--text-primary);
        border-color: var(--text-secondary);
      }
    }

    /* Theme toggle buttons */
    .settings-theme-row {
      display: flex;
      gap: 0.5rem;
    }

    .settings-theme-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text-secondary);
      font-size: var(--fs-small);
      cursor: pointer;
      flex: 1;
      justify-content: center;
      transition:
        color var(--t-fast) var(--ease),
        border-color var(--t-fast) var(--ease),
        background-color var(--t-fast) var(--ease);

      &:hover {
        color: var(--text-primary);
        border-color: var(--text-secondary);
        background: var(--bg-elevated);
      }

      &--active {
        color: var(--solder);
        border-color: var(--solder);
        background: var(--solder-tint);
        font-weight: 500;
      }
    }
  `],
})
export class SettingsPanel implements OnInit, OnDestroy {
  readonly close = output<void>();

  protected readonly theme = inject(ThemeService);
  protected readonly primaryColor = signal(this.loadColor());

  private readonly card = viewChild<ElementRef<HTMLElement>>('card');
  private previousFocus: HTMLElement | null = null;

  ngOnInit(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    setTimeout(() => this.card()?.nativeElement.focus(), 50);
    this.applyColor(this.primaryColor());
  }

  ngOnDestroy(): void {
    this.previousFocus?.focus();
  }

  onColorChange(e: Event): void {
    const color = (e.target as HTMLInputElement).value;
    this.primaryColor.set(color);
    this.applyColor(color);
    try { localStorage.setItem(LS_COLOR_KEY, color); } catch { /* ignore */ }
  }

  resetColor(): void {
    this.primaryColor.set(DEFAULT_COLOR);
    this.applyColor(DEFAULT_COLOR);
    try { localStorage.removeItem(LS_COLOR_KEY); } catch { /* ignore */ }
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('settings-backdrop')) {
      this.close.emit();
    }
  }

  private applyColor(color: string): void {
    document.documentElement.style.setProperty('--solder', color);
    document.documentElement.style.setProperty('--solder-tint', `${color}22`);
  }

  private loadColor(): string {
    try { return localStorage.getItem(LS_COLOR_KEY) ?? DEFAULT_COLOR; } catch { return DEFAULT_COLOR; }
  }
}
