import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

/**
 * Revela el elemento al entrar en viewport (plan §10: slide/fade-in en scroll).
 * Añade la clase `is-visible`. Bajo prefers-reduced-motion el CSS ya deja todo
 * visible, así que esto es progresivo y seguro.
 *
 * Uso: <div appReveal class="reveal"> o <div appReveal [revealDelay]="120">
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  readonly revealDelay = input(0); // ms de retardo escalonado

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    this.renderer.addClass(node, 'reveal');

    if (typeof IntersectionObserver === 'undefined') {
      this.show(node);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const delay = this.revealDelay();
            if (delay > 0) {
              this.renderer.setStyle(node, 'transition-delay', `${delay}ms`);
            }
            this.show(node);
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    this.observer.observe(node);
  }

  private show(node: HTMLElement): void {
    this.renderer.addClass(node, 'is-visible');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
