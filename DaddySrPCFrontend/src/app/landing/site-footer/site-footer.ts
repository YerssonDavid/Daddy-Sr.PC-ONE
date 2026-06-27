import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <a class="footer__brand" href="#hero">
          <img src="logo.png" alt="" width="28" height="28" />
          <span>Daddy <span class="footer__sr">Sr.PC</span></span>
        </a>
        <nav class="footer__links" aria-label="Footer navigation">
          <a href="#features">{{ 'footer.features' | transloco }}</a>
          <a href="#howit">{{ 'footer.howItWorks' | transloco }}</a>
          <a href="#demo">{{ 'footer.tryIt' | transloco }}</a>
        </nav>
        <div class="footer__meta">
          <a
            class="footer__github mono"
            href="https://github.com/YerssonDavid"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub — YerssonDavid"
          >
            <svg class="footer__gh-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            YerssonDavid
          </a>
          <p class="footer__made mono">
            {{ 'footer.madeWith' | transloco }}
            <span class="footer__heart" aria-label="amor" role="img">♥</span>
            {{ 'footer.madeBy' | transloco }}
            <svg
              class="footer__flag"
              viewBox="0 0 30 20"
              width="22"
              height="15"
              role="img"
              aria-label="Bandera de Colombia"
            >
              <rect width="30" height="10" fill="#FCD116" />
              <rect y="10" width="30" height="5" fill="#003893" />
              <rect y="15" width="30" height="5" fill="#CE1126" />
            </svg>
          </p>
          <p class="footer__copy mono">© {{ year }} Daddy Sr.PC</p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        border-top: 1px solid var(--border);
        background: var(--bg-surface);
        padding-block: 2rem;
      }
      .footer__inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1.25rem;
      }
      .footer__brand {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-family: var(--font-display);
        font-weight: 700;
        color: var(--text-primary);
      }
      .footer__brand img {
        border-radius: 50%;
        border: 1px solid var(--border);
      }
      .footer__sr {
        color: var(--solder);
      }
      .footer__links {
        display: flex;
        gap: 1.5rem;
      }
      .footer__links a {
        font-size: var(--fs-small);
        color: var(--text-secondary);
        transition: color var(--t-fast) var(--ease);
      }
      .footer__links a:hover {
        color: var(--trace);
      }
      .footer__meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.35rem;
      }
      .footer__github {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: var(--fs-mono-sm);
        color: var(--text-secondary);
        transition: color var(--t-fast) var(--ease);
      }
      .footer__github:hover {
        color: var(--trace);
      }
      .footer__github:hover .footer__gh-icon {
        filter: drop-shadow(0 0 4px var(--trace));
      }
      .footer__gh-icon {
        flex-shrink: 0;
        transition: filter var(--t-fast) var(--ease);
      }
      .footer__made {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: var(--fs-mono-sm);
        color: var(--text-secondary);
      }
      .footer__heart {
        color: var(--alert);
        font-size: 0.95rem;
        line-height: 1;
        animation: heartbeat 1.6s var(--ease) infinite;
      }
      .footer__flag {
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0 0 0 1px var(--glass-border);
        transition: transform var(--t-normal) var(--ease);
      }
      .footer__made:hover .footer__flag {
        transform: translateY(-1px) scale(1.1);
      }
      .footer__copy {
        font-size: var(--fs-mono-sm);
        color: var(--text-muted);
      }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.25); }
        30% { transform: scale(1); }
        45% { transform: scale(1.18); }
      }
      @media (max-width: 560px) {
        .footer__inner {
          flex-direction: column;
          align-items: flex-start;
        }
        .footer__meta {
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
}
