import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

interface FeatureMeta {
  id: string;
  icon: string;
}

const FEATURES: FeatureMeta[] = [
  { id: 'compat', icon: 'M5 12h4l2-4 2 8 2-4h4' },
  { id: 'build', icon: 'M4 7h7M4 12h13M4 17h9' },
  { id: 'tech', icon: 'M7 4v4H3M17 4v4h4M7 20v-4H3M17 20v-4h4M9 9h6v6H9z' },
  { id: 'best', icon: 'M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
];

@Component({
  selector: 'app-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoPipe],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features = FEATURES;
}
