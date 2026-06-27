import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-closing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoPipe],
  template: `
    <section class="closing">
      <div class="container closing__inner" appReveal>
        <p class="eyebrow">{{ 'closing.eyebrow' | transloco }}</p>
        <h2 class="closing__title">
          {{ 'closing.titleStart' | transloco }}<span>Sr.PC</span>{{ 'closing.titleEnd' | transloco }}
        </h2>
        <p class="closing__sub">
          {{ 'closing.sub' | transloco }}
        </p>
        <a class="btn btn--primary closing__cta" href="#demo">
          {{ 'closing.cta' | transloco }}
        </a>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-block: var(--space-section);
      }
      .closing__inner {
        text-align: center;
        max-width: 40ch;
        margin-inline: auto;
      }
      .closing__title {
        margin-top: 0.75rem;
        font-size: var(--fs-h2);
      }
      .closing__title span {
        color: var(--solder);
      }
      .closing__sub {
        margin: 1rem auto 2rem;
        color: var(--text-secondary);
      }
      .closing__cta {
        padding: 1rem 2.25rem;
        font-size: 1.0625rem;
      }
    `,
  ],
})
export class Closing {}
