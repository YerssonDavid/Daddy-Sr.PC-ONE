import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RequestCounter } from '../state/request-counter.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register-gate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <div
      class="gate-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      aria-describedby="gate-desc"
      (keydown.escape)="close.emit()"
      (click)="onBackdropClick($event)"
    >
      <div class="gate-card" #card tabindex="-1">

        <!-- Eyebrow -->
        <div class="gate-header">
          <p class="gate-eyebrow eyebrow">{{ 'chat.limitEyebrow' | transloco }}</p>
          <button
            type="button"
            class="gate-close-btn"
            (click)="close.emit()"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Icon -->
        <div class="gate-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
            <circle cx="12" cy="12" r="9" stroke="var(--trace)" stroke-width="1.5"/>
            <path d="M12 7v5l3 3" stroke="var(--trace)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Title -->
        <h2 class="gate-title" id="gate-title">
          {{ 'chat.limitTitle' | transloco : { total: counter.total } }}
        </h2>

        <!-- Body -->
        <p class="gate-desc" id="gate-desc">
          {{ 'chat.limitDesc' | transloco : { total: counter.total } }}
        </p>

        <!-- CTA: only close -->
        <button
          type="button"
          class="btn btn--primary gate-cta"
          (click)="close.emit()"
        >
          {{ 'chat.limitClose' | transloco }}
        </button>

      </div>
    </div>
  `,
  styles: [`
    .gate-backdrop {
      position: absolute;
      inset: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: color-mix(in srgb, var(--bg-base) 70%, transparent);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      animation: fade-up 0.4s var(--ease) both;
    }

    .gate-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      max-width: 380px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      text-align: center;
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.4),
        0 0 0 1px var(--glass-border),
        0 0 40px var(--trace-tint);
      outline: none;
    }

    .gate-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .gate-eyebrow {
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);
      color: var(--trace);
      letter-spacing: 0.1em;
    }

    .gate-close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text-muted);
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

    .gate-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--trace-tint);
      border: 1px solid color-mix(in srgb, var(--trace) 30%, transparent);
    }

    .gate-title {
      font-family: var(--font-display);
      font-size: var(--fs-h3);
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .gate-desc {
      color: var(--text-secondary);
      font-size: var(--fs-body);
      line-height: 1.6;
    }

    .gate-cta {
      width: 100%;
      justify-content: center;
      margin-top: 0.5rem;
    }
  `],
})
export class RegisterGate implements OnInit, OnDestroy {
  readonly close = output<void>();

  protected readonly counter = inject(RequestCounter);

  private readonly card = viewChild<ElementRef<HTMLElement>>('card');
  private previousFocus: HTMLElement | null = null;

  ngOnInit(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    setTimeout(() => this.card()?.nativeElement.focus(), 100);
  }

  ngOnDestroy(): void {
    this.previousFocus?.focus();
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('gate-backdrop')) {
      this.close.emit();
    }
  }
}
