import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Nav } from '../landing/nav/nav';
import { SiteFooter } from '../landing/site-footer/site-footer';
import { AuthService } from '../core/auth.service';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTEMPTS = 3;

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslocoPipe, Nav, SiteFooter],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly email       = signal('');
  protected readonly password    = signal('');
  protected readonly showPwd     = signal(false);
  protected readonly dirty       = signal(new Set<string>());
  protected readonly loading     = signal(false);
  protected readonly success     = signal(false);
  protected readonly shaking     = signal(false);
  protected readonly serverError = signal<string | null>(null);
  protected readonly attempts    = signal(0);
  protected readonly locked      = signal(false);

  protected readonly attemptsLeft = computed(() => MAX_ATTEMPTS - this.attempts());

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

  private shake(): void {
    if (!this.shaking()) {
      this.shaking.set(true);
      setTimeout(() => this.shaking.set(false), 520);
    }
  }

  submit(): void {
    if (this.locked() || this.loading()) return;

    this.dirty.update(d => new Set([...d, 'email', 'password']));
    if (!this.canSubmit()) { this.shake(); return; }

    this.loading.set(true);
    this.serverError.set(null);

    this.auth.login({ email: this.email().trim(), password: this.password() }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        this.loading.set(false);
        this.attempts.update(n => n + 1);

        if (this.attempts() >= MAX_ATTEMPTS) {
          this.locked.set(true);
          this.serverError.set('login.errors.tooManyAttempts');
        } else {
          const msg = err?.error?.message ?? err?.message ?? 'login.errors.serverError';
          this.serverError.set(msg);
        }
        this.shake();
      },
    });
  }
}
