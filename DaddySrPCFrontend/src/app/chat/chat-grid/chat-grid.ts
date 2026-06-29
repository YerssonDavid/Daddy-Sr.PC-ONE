import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

/**
 * Fondo de cuadrícula animada del chat — "la mesa de trabajo en vivo" (doc §3).
 * Tres capas CSS puras: rejilla fina (40px), rejilla gruesa (160px) y nodos
 * que respiran. Paralaje reactivo al puntero en desktop (opcional, throttleado).
 * Apagado total con prefers-reduced-motion.
 */
@Component({
  selector: 'app-chat-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid-fine" aria-hidden="true"></div>
    <div class="grid-coarse" aria-hidden="true"></div>
    <div class="grid-nodes" aria-hidden="true"></div>
  `,
  styleUrl: './chat-grid.scss',
})
export class ChatGrid implements OnInit {
  private readonly el = inject(ElementRef) as ElementRef<HTMLElement>;
  private rafId = 0;
  private reducedMotion = false;

  ngOnInit(): void {
    this.reducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(e: PointerEvent): void {
    if (this.reducedMotion || e.pointerType !== 'mouse') return;
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      const host = this.el.nativeElement;
      host.style.setProperty('--px', `${x * 12}px`);
      host.style.setProperty('--py', `${y * 12}px`);
      host.style.setProperty('--px2', `${x * -22}px`);
      host.style.setProperty('--py2', `${y * -22}px`);
      this.rafId = 0;
    });
  }
}
