import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface CodeBlockData {
  kind: 'code';
  lang: string;
  code: string;
}

/** Bloque de specs técnicas en mono — doc §6.3 */
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block">
      <div class="code-block__header">
        <span class="code-block__lang eyebrow">{{ data().lang }}</span>
        <button
          type="button"
          class="code-block__copy"
          (click)="copy()"
          [attr.aria-label]="'Copiar ' + data().lang"
        >
          @if (copied) {
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.6"/>
            </svg>
          }
          <span>{{ copied ? 'Copiado' : 'Copiar' }}</span>
        </button>
      </div>
      <pre class="code-block__pre"><code>{{ data().code }}</code></pre>
    </div>
  `,
  styles: [`
    .code-block {
      border-radius: var(--radius-sm);
      border: 1px solid var(--glass-border);
      overflow: hidden;
      margin-block: 0.5rem;
    }

    .code-block__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.375rem 0.75rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--glass-border);
    }

    .code-block__copy {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);
      cursor: pointer;
      transition:
        color var(--t-fast) var(--ease),
        border-color var(--t-fast) var(--ease),
        background-color var(--t-fast) var(--ease);

      &:hover {
        color: var(--trace);
        border-color: var(--glass-border);
        background: var(--bg-surface);
      }
    }

    .code-block__pre {
      margin: 0;
      padding: 0.875rem;
      overflow-x: auto;
      background: color-mix(in srgb, var(--bg-surface) 80%, transparent);

      code {
        font-family: var(--font-mono);
        font-size: var(--fs-mono-sm);
        color: var(--text-primary);
        line-height: 1.6;
        white-space: pre;
      }
    }
  `],
})
export class CodeBlock {
  readonly data = input.required<CodeBlockData>();
  copied = false;
  private copyTimer?: ReturnType<typeof setTimeout>;

  copy(): void {
    navigator.clipboard?.writeText(this.data().code).catch(() => {});
    this.copied = true;
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => { this.copied = false; }, 2000);
  }
}
