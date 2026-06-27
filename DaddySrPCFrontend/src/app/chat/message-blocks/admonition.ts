import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AdmonitionBlock {
  kind: 'admonition';
  tone: 'warn' | 'info';
  text: string;
}

/** Admonición: warnings en cobre (alert) o info en cian (trace) — doc §6.3 */
@Component({
  selector: 'app-admonition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admonition" [class.admonition--warn]="data().tone === 'warn'"
                            [class.admonition--info]="data().tone === 'info'"
         role="note">
      <span class="admonition__icon" aria-hidden="true">
        @if (data().tone === 'warn') {
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6"/>
            <path d="M12 8h.01M12 12v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        }
      </span>
      <p class="admonition__text">{{ data().text }}</p>
    </div>
  `,
  styles: [`
    .admonition {
      display: flex;
      gap: 0.625rem;
      padding: 0.625rem 0.875rem;
      border-radius: var(--radius-sm);
      border-left: 3px solid;
      margin-block: 0.5rem;
      align-items: flex-start;

      &--warn {
        border-color: var(--alert);
        background: var(--alert-tint);
        color: var(--alert);

        .admonition__text { color: var(--text-primary); }
      }

      &--info {
        border-color: var(--trace);
        background: var(--trace-tint);
        color: var(--trace);

        .admonition__text { color: var(--text-primary); }
      }
    }

    .admonition__icon {
      flex-shrink: 0;
      margin-top: 1px;
    }

    .admonition__text {
      font-size: var(--fs-small);
      line-height: 1.5;
      margin: 0;
    }
  `],
})
export class Admonition {
  readonly data = input.required<AdmonitionBlock>();
}
