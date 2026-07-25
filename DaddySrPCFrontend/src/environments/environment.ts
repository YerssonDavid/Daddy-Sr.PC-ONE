/**
 * Configuración de entorno — DESARROLLO.
 *
 * El build de producción reemplaza este archivo por `environment.prod.ts`
 * mediante `fileReplacements` en angular.json, de modo que las URLs del
 * backend nunca quedan hardcodeadas en el bundle final.
 */
export const environment = {
  production: false,
  /** Base del backend. En dev apunta al servidor local. */
  apiBaseUrl: 'http://localhost:8080',
  /** Endpoint de Spring Security que arranca el flujo OAuth2 con Google. */
  oauthGoogleUrl: 'http://localhost:8080/oauth2/authorization/google',
  /** Activa la pantalla de mantenimiento global con temporizador. */
  maintenanceMode: false,
};
