import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CircuitTrace } from '../shared/circuit-trace/circuit-trace';
import { Nav } from './nav/nav';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { HowItWorks } from './how-it-works/how-it-works';
import { LiveDemo } from './live-demo/live-demo';
import { Closing } from './closing/closing';
import { SiteFooter } from './site-footer/site-footer';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Nav, Hero, Features, HowItWorks, LiveDemo, Closing, SiteFooter, CircuitTrace],
  template: `
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <app-nav />
    <main id="main">
      <app-hero />
      <app-circuit-trace variant="left" />
      <app-features />
      <app-circuit-trace variant="right" />
      <app-how-it-works />
      <app-circuit-trace variant="center" />
      <app-live-demo />
      <app-closing />
    </main>
    <app-site-footer />
  `,
  styles: [`
    :host { display: block; }
    .skip-link {
      position: absolute;
      left: 1rem;
      top: -3rem;
      z-index: 100;
      padding: 0.6rem 1rem;
      border-radius: var(--radius);
      background: var(--solder);
      color: var(--solder-ink);
      font-family: var(--font-display);
      font-weight: 600;
      font-size: var(--fs-small);
      transition: top var(--t-fast) var(--ease);
    }
    .skip-link:focus { top: 1rem; }
  `],
})
export class LandingPage {}
