import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

/**
 * Elemento firma (plan §3): un trazo de circuito cian que se "suelda"
 * (se dibuja) cuando entra en viewport, conectando una sección con la
 * siguiente. Solo se muestra en desktop (≥1024px) y respeta
 * prefers-reduced-motion (donde aparece ya dibujado, sin animación).
 *
 * `variant` alterna el recorrido del trazo para que no todos sean iguales.
 */
@Component({
  selector: 'app-circuit-trace',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="trace"
      viewBox="0 0 200 120"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path class="trace__path" [attr.d]="path()" />
      <circle class="trace__node trace__node--top" [attr.cx]="startX()" cy="6" r="4" />
      <circle class="trace__node trace__node--bottom" [attr.cx]="endX()" cy="114" r="4" />
    </svg>
  `,
  styleUrl: './circuit-trace.scss',
})
export class CircuitTrace implements AfterViewInit, OnDestroy {
  readonly variant = input<'left' | 'center' | 'right'>('center');

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  protected startX(): number {
    return this.variant() === 'left' ? 40 : this.variant() === 'right' ? 160 : 100;
  }
  protected endX(): number {
    return this.variant() === 'left' ? 150 : this.variant() === 'right' ? 50 : 100;
  }

  /** Trazo en ángulo recto, estilo PCB. */
  protected path(): string {
    const sx = this.startX();
    const ex = this.endX();
    return `M ${sx} 6 L ${sx} 46 L ${ex} 74 L ${ex} 114`;
  }

  ngAfterViewInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'is-drawn');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(node, 'is-drawn');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
