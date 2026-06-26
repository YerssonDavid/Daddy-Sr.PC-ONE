import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <button
      type="button"
      class="theme-toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="(theme.theme() === 'dark' ? 'nav.lightMode' : 'nav.darkMode') | transloco"
      [attr.aria-pressed]="theme.theme() === 'light'"
    >
      @if (theme.theme() === 'dark') {
        <!-- sol: cambiar a claro -->
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6" />
          <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" />
          </g>
        </svg>
      } @else {
        <!-- luna: cambiar a oscuro -->
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linejoin="round"
          />
        </svg>
      }
    </button>
  `,
  styles: [
    `
      .theme-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        background: var(--bg-surface);
        color: var(--text-secondary);
        transition: color var(--t-fast) var(--ease),
          border-color var(--t-fast) var(--ease),
          background-color var(--t-fast) var(--ease);
      }
      .theme-toggle:hover {
        color: var(--trace);
        border-color: var(--trace);
        background: var(--bg-elevated);
      }
    `,
  ],
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
