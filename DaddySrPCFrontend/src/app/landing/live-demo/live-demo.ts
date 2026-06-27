import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { startWith, switchMap } from 'rxjs';
import { RevealDirective } from '../../shared/reveal.directive';

type Level = 'novato' | 'intermedio' | 'avanzado';

interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
}

const TOTAL_REQUESTS = 15;
const REPLY_KEYS = ['r1', 'r2'] as const;

@Component({
  selector: 'app-live-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RevealDirective, TranslocoPipe],
  templateUrl: './live-demo.html',
  styleUrl: './live-demo.scss',
})
export class LiveDemo implements OnInit, OnDestroy {
  protected readonly total = TOTAL_REQUESTS;

  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly remaining = signal(TOTAL_REQUESTS);
  protected readonly level = signal<Level>('intermedio');
  protected readonly draft = signal('');
  protected readonly typing = signal(false);
  protected readonly gateOpen = signal(false);

  protected readonly notice = computed<'none' | 'soft' | 'strong'>(() => {
    const r = this.remaining();
    if (r === 0) return 'none';
    if (r === 1) return 'strong';
    if (r <= 5) return 'soft';
    return 'none';
  });

  protected readonly levels: Level[] = ['novato', 'intermedio', 'avanzado'];

  private readonly body = viewChild<ElementRef<HTMLElement>>('body');
  private timers: ReturnType<typeof setTimeout>[] = [];

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
      .subscribe(() => this.resetChat());
  }

  private resetChat(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.messages.set([
      { role: 'agent', text: this.transloco.translate('demo.welcome') },
    ]);
    this.remaining.set(TOTAL_REQUESTS);
    this.draft.set('');
    this.typing.set(false);
    this.gateOpen.set(false);
  }

  setLevel(level: Level): void {
    this.level.set(level);
  }

  send(): void {
    const text = this.draft().trim();
    if (!text || this.typing() || this.remaining() === 0) return;

    this.messages.update((m) => [...m, { role: 'user', text }]);
    this.draft.set('');
    this.remaining.update((r) => r - 1);
    this.scrollSoon();

    if (this.remaining() === 0) {
      this.respond(true);
    } else {
      this.respond(false);
    }
  }

  private respond(openGateAfter: boolean): void {
    const key = REPLY_KEYS[Math.floor(Math.random() * REPLY_KEYS.length)];
    const reply = this.transloco.translate(`demo.replies.${this.level()}.${key}`);
    this.typing.set(true);

    const reveal = () => {
      this.messages.update((m) => [...m, { role: 'agent', text: reply }]);
      this.typing.set(false);
      this.scrollSoon();
      if (openGateAfter) {
        this.timers.push(setTimeout(() => this.gateOpen.set(true), 700));
      }
    };

    if (this.reducedMotion) {
      reveal();
    } else {
      this.timers.push(setTimeout(reveal, 900));
    }
  }

  closeGate(): void {
    this.gateOpen.set(false);
  }

  private scrollSoon(): void {
    this.timers.push(
      setTimeout(() => {
        const el = this.body()?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      }, 60),
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }
}
