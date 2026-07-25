import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterPayload {
  name:     string;
  surname:  string;
  email:    string;
  apod:     string;
  password: string;
  interest: string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly BASE = environment.apiBaseUrl;

  register(payload: RegisterPayload): Observable<unknown> {
    return this.http.post(`${this.BASE}/registry/user`, payload);
  }

  login(payload: LoginPayload): Observable<unknown> {
    return this.http.post(`${this.BASE}/login/user`, payload);
  }

  /**
   * Inicia el flujo OAuth2 con Google delegando al backend (Spring Security).
   * Una redirección full-page es necesaria para que el navegador siga la
   * cadena de redirecciones de Google y Spring pueda establecer la sesión
   * (cookie JSESSIONID) en el dominio del backend.
   */
  loginWithGoogle(): void {
    window.location.href = environment.oauthGoogleUrl;
  }
}
