import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

const MAINTENANCE_SECONDS = 3600;

@Component({
  selector: 'app-maintenance-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <div class="maintenance-backdrop" role="alert" aria-live="polite">
      <div class="maintenance-card">
        <div class="maintenance-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" />
            <path d="M24 14v10M24 30v2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </div>

        <h1 class="maintenance-title">{{ 'maintenance.title' | transloco }}</h1>
        <p class="maintenance-sub">{{ 'maintenance.sub' | transloco }}</p>

        <div class="maintenance-timer" aria-label="{{ 'maintenance.timerAria' | transloco }}: {{ formatted() }}">
          <span class="maintenance-timer-value">{{ formatted() }}</span>
          <span class="maintenance-timer-label">{{ 'maintenance.timerLabel' | transloco }}</span>
        </div>

        <p class="maintenance-note">{{ 'maintenance.note' | transloco }}</p>
      </div>
    </div>
  `,
  styles: [`
    .maintenance-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: color-mix(in srgb, var(--bg-base) 88%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .maintenance-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 3rem 2.5rem;
      max-width: 480px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      text-align: center;
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.5),
        0 0 0 1px var(--glass-border),
        0 0 60px var(--solder-tint);
      animation: fade-up 0.4s var(--ease) both;
    }

    .maintenance-icon {
      color: var(--solder);
      opacity: 0.8;
      animation: glow-pulse 3s ease-in-out infinite;
    }

    .maintenance-title {
      font-family: var(--font-display);
      font-size: var(--fs-h2);
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .maintenance-sub {
      font-size: var(--fs-body);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 360px;
    }

    .maintenance-timer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.375rem;
      margin-block: 0.5rem;
    }

    .maintenance-timer-value {
      font-family: var(--font-mono);
      font-size: clamp(2.5rem, 1.8rem + 4vw, 3.5rem);
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--solder);
      line-height: 1;
    }

    .maintenance-timer-label {
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--trace);
    }

    .maintenance-note {
      font-size: var(--fs-small);
      color: var(--text-muted);
      line-height: 1.5;
    }
  `],
})
export class MaintenanceOverlay implements OnInit, OnDestroy {
  protected readonly remaining = signal(MAINTENANCE_SECONDS);
  protected readonly formatted = computed(() => this.formatTime(this.remaining()));

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const next = this.remaining() - 1;
      if (next <= 0) {
        this.remaining.set(0);
        this.stop();
      } else {
        this.remaining.set(next);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
