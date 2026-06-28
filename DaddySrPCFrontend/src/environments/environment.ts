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
};
