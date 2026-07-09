import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LangSelector } from '../../shared/lang-selector/lang-selector';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';
import { GithubStars } from '../../shared/github-stars/github-stars.service';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggle, LangSelector, TranslocoPipe],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly ghStars = inject(GithubStars);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }
}
