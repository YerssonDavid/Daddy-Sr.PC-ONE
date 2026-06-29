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

const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_UPPER  = /[A-Z]/;
const PWD_SYMBOL = /[^A-Za-z0-9]/;

export type Step     = 1 | 2 | 3;
export type Interest = 'gamer' | 'creator' | 'overclocker' | 'aprendiz';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslocoPipe, Nav, SiteFooter],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly TOTAL = 3;
  protected readonly STEPS: Step[] = [1, 2, 3];

  protected readonly step      = signal<Step>(1);
  protected readonly direction = signal<'forward' | 'back'>('forward');

  /* ---- Step 1: Identidad ---- */
  protected readonly name    = signal('');
  protected readonly surname = signal('');
  protected readonly apod    = signal('');

  /* ---- Step 2: Acceso ---- */
  protected readonly email   = signal('');
  protected readonly password = signal('');
  protected readonly showPwd = signal(false);

  /* ---- Step 3: Perfil ---- */
  protected readonly interest = signal<Interest | ''>('');

  protected readonly dirty   = signal(new Set<string>());
  protected readonly loading    = signal(false);
  protected readonly success    = signal(false);
  protected readonly serverError = signal<string | null>(null);

  /* ---- Validation: Step 1 ---- */
  protected readonly nameError = computed(() => {
    if (!this.dirty().has('name')) return null;
    return this.name().trim() ? null : 'register.errors.nameRequired';
  });
  protected readonly surnameError = computed(() => {
    if (!this.dirty().has('surname')) return null;
    return this.surname().trim() ? null : 'register.errors.surnameRequired';
  });
  protected readonly apodError = computed(() => {
    if (!this.dirty().has('apod')) return null;
    const v = this.apod().trim();
    if (!v) return 'register.errors.apodRequired';
    return v.length >= 3 ? null : 'register.errors.apodMinLength';
  });

  /* ---- Validation: Step 2 ---- */
  protected readonly emailError = computed(() => {
    if (!this.dirty().has('email')) return null;
    if (!this.email().trim()) return 'register.errors.emailRequired';
    return EMAIL_RE.test(this.email()) ? null : 'register.errors.emailInvalid';
  });

  /* Live password requirement checks (shown while typing, not just on error) */
  protected readonly pwdHasLength = computed(() => this.password().length >= 8);
  protected readonly pwdHasUpper  = computed(() => PWD_UPPER.test(this.password()));
  protected readonly pwdHasSymbol = computed(() => PWD_SYMBOL.test(this.password()));
  protected readonly pwdShowHints = computed(() => this.password().length > 0);
  protected readonly passwordValid = computed(
    () => this.pwdHasLength() && this.pwdHasUpper() && this.pwdHasSymbol(),
  );
  protected readonly passwordError = computed(() => {
    if (!this.dirty().has('password')) return null;
    const p = this.password();
    if (!p)                   return 'register.errors.passwordRequired';
    if (!this.pwdHasLength()) return 'register.errors.passwordMinLength';
    if (!this.pwdHasUpper())  return 'register.errors.passwordUppercase';
    if (!this.pwdHasSymbol()) return 'register.errors.passwordSymbol';
    return null;
  });

  /* ---- Validation: Step 3 ---- */
  protected readonly interestError = computed(() => {
    if (!this.dirty().has('interest')) return null;
    return this.interest() ? null : 'register.errors.interestRequired';
  });

  /* ---- Can proceed per step ---- */
  protected readonly canStep1 = computed(
    () => this.name().trim().length > 0 &&
          this.surname().trim().length > 0 &&
          this.apod().trim().length >= 3,
  );
  protected readonly canStep2 = computed(
    () => EMAIL_RE.test(this.email()) && this.passwordValid(),
  );
  protected readonly canStep3 = computed(() => !!this.interest());

  /* ---- Navigation ---- */
  next(): void {
    const s = this.step();
    if (s === 1) {
      this.dirty.update(d => new Set([...d, 'name', 'surname', 'apod']));
      if (!this.canStep1()) return;
      this.direction.set('forward');
      this.step.set(2);
    } else if (s === 2) {
      this.dirty.update(d => new Set([...d, 'email', 'password']));
      if (!this.canStep2()) return;
      this.direction.set('forward');
      this.step.set(3);
    }
  }

  back(): void {
    const s = this.step();
    if (s > 1) {
      this.direction.set('back');
      this.step.set((s - 1) as Step);
    }
  }

  touch(field: string): void {
    this.dirty.update(d => new Set([...d, field]));
  }

  goToStep(n: Step): void {
    if (n >= this.step()) return;
    this.direction.set('back');
    this.step.set(n);
  }

  selectInterest(i: Interest): void {
    this.interest.set(i);
    this.dirty.update(d => new Set([...d, 'interest']));
  }

  submit(): void {
    this.dirty.update(d => new Set([...d, 'interest']));
    if (!this.canStep3() || this.loading()) return;

    this.loading.set(true);
    this.serverError.set(null);

    this.auth.register({
      name:     this.name().trim(),
      surname:  this.surname().trim(),
      email:    this.email().trim(),
      apod:     this.apod().trim(),
      password: this.password(),
      interest: this.interest() as string,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message ?? err?.message ?? 'register.errors.serverError';
        this.serverError.set(msg);
      },
    });
  }
}
