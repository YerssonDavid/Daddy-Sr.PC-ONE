import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

interface StepMeta {
  n: string;
  key: string;
}

const STEPS: StepMeta[] = [
  { n: '01', key: 'step1' },
  { n: '02', key: 'step2' },
  { n: '03', key: 'step3' },
  { n: '04', key: 'step4' },
];

@Component({
  selector: 'app-how-it-works',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoPipe],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks {
  protected readonly steps = STEPS;
}
