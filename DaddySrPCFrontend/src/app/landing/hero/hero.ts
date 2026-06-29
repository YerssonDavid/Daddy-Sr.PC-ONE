import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { startWith, switchMap } from 'rxjs';
import { RevealDirective } from '../../shared/reveal.directive';

interface DemoLine {
  role: 'user' | 'agent';
  text: string;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  protected readonly lines = signal<DemoLine[]>([]);
  protected readonly typing = signal<string>('');
  protected readonly typingRole = signal<'user' | 'agent' | null>(null);

  private timers: ReturnType<typeof setTimeout>[] = [];
  private script: DemoLine[] = [];

  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  private get reducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  ngOnInit(): void {
    this.transloco.langChanges$
      .pipe(
        startWith(this.transloco.getActiveLang()),
        switchMap((lang) => this.transloco.selectTranslation(lang)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.buildScriptAndPlay());
  }

  private buildScriptAndPlay(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.lines.set([]);
    this.typing.set('');
    this.typingRole.set(null);

    this.script = [
      {
        role: 'user',
        text: this.transloco.translate('hero.demo.question'),
      },
      {
        role: 'agent',
        text: this.transloco.translate('hero.demo.answer'),
      },
    ];

    if (this.reducedMotion) {
      this.lines.set([...this.script]);
    } else {
      this.play(0);
    }
  }

  private play(index: number): void {
    if (index >= this.script.length) {
      this.timers.push(
        setTimeout(() => {
          this.lines.set([]);
          this.play(0);
        }, 6000),
      );
      return;
    }

    const line = this.script[index];
    this.typingRole.set(line.role);
    this.typing.set('');

    const charDelay = line.role === 'agent' ? 26 : 45;
    let i = 0;

    const step = () => {
      i++;
      this.typing.set(line.text.slice(0, i));
      if (i < line.text.length) {
        this.timers.push(setTimeout(step, charDelay));
      } else {
        this.timers.push(
          setTimeout(
            () => {
              this.lines.update((curr) => [...curr, line]);
              this.typing.set('');
              this.typingRole.set(null);
              this.play(index + 1);
            },
            line.role === 'user' ? 500 : 1100,
          ),
        );
      }
    };

    this.timers.push(setTimeout(step, line.role === 'agent' ? 700 : 200));
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }
}
