import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Indicador "Daddy está escribiendo…" — tres puntos rebotando (doc §7.5) */
@Component({
  selector: 'app-typing-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="typing" role="status" aria-label="Daddy está escribiendo">
      <div class="typing__avatar" aria-hidden="true">
        <img src="logo.png" alt="" width="28" height="28" />
      </div>
      <div class="typing__bubble">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  `,
  styles: [`
    .typing {
      display: flex;
      align-items: flex-end;
      gap: 0.625rem;
      animation: fade-up 0.3s var(--ease) both;
    }

    .typing__avatar img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid var(--glass-border);
    }

    .typing__bubble {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-lg);
      border-bottom-left-radius: 4px;
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
    }

    .dot {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--trace);
      animation: typing-bounce 1.2s ease-in-out infinite;

      &:nth-child(2) { animation-delay: 0.15s; }
      &:nth-child(3) { animation-delay: 0.30s; }
    }

    @keyframes typing-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .dot { animation: none; opacity: 0.6; }
    }
  `],
})
export class TypingIndicator {}
