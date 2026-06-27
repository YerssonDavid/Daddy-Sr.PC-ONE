import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { Nav } from '../landing/nav/nav';
import { SiteFooter } from '../landing/site-footer/site-footer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslocoPipe, Nav, SiteFooter],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly email    = signal('');
  protected readonly password = signal('');
  protected readonly showPwd  = signal(false);
  protected readonly dirty    = signal(new Set<string>());
  protected readonly loading  = signal(false);
  protected readonly success  = signal(false);
  protected readonly shaking  = signal(false);

  protected readonly emailError = computed(() => {
    if (!this.dirty().has('email')) return null;
    if (!this.email().trim()) return 'login.errors.emailRequired';
    return EMAIL_RE.test(this.email()) ? null : 'login.errors.emailInvalid';
  });

  protected readonly passwordError = computed(() => {
    if (!this.dirty().has('password')) return null;
    return this.password() ? null : 'login.errors.passwordRequired';
  });

  protected readonly canSubmit = computed(
    () => EMAIL_RE.test(this.email()) && this.password().length > 0,
  );

  touch(field: string): void {
    this.dirty.update(d => new Set([...d, field]));
  }

  submit(): void {
    this.dirty.update(d => new Set([...d, 'email', 'password']));
    if (!this.canSubmit() || this.loading()) {
      if (!this.shaking()) {
        this.shaking.set(true);
        setTimeout(() => this.shaking.set(false), 520);
      }
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.success.set(true);
    }, 1200);
  }
}
