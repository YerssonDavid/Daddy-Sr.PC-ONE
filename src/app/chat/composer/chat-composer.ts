import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-chat-composer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslocoPipe],
  templateUrl: './chat-composer.html',
  styleUrl: './chat-composer.scss',
})
export class ChatComposer {
  readonly disabled = input(false);
  readonly typing = input(false);
  readonly send = output<string>();

  protected readonly draft = signal('');
  protected readonly isSent = signal(false);

  private readonly textarea = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');

  submit(): void {
    const text = this.draft().trim();
    if (!text || this.disabled() || this.typing()) return;
    this.send.emit(text);
    this.draft.set('');
    this.autoResize();
    this.playBriefSentState();
    this.textarea()?.nativeElement.focus();
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.submit();
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.draft.set(target.value);
    this.autoResize();
  }

  private autoResize(): void {
    const el = this.textarea()?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  private playBriefSentState(): void {
    this.isSent.set(true);
    setTimeout(() => this.isSent.set(false), 1200);
  }
}
