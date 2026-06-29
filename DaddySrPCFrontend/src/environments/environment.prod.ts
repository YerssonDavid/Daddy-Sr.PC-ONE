/**
 * Configuración de entorno — PRODUCCIÓN.
 *
 * `apiBaseUrl` vacío = mismo origen. En producción el frontend debería
 * servirse tras un proxy inverso que enrute el backend en el mismo host
 * sobre HTTPS. Así se evitan URLs hardcodeadas, contenido mixto (mixed
 * content) y configuraciones CORS innecesarias.
 */
export const environment = {
  production: true,
  apiBaseUrl: '',
};
