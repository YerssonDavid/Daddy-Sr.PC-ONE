<div align="center">

<img src="public/logo.png" alt="Daddy Sr.PC Logo" width="140" />

# Daddy Sr.PC

### Tu agente de IA especializado en PC Hardware

Un agente de inteligencia artificial que te **acompaña, guía y resuelve** todo lo que necesites saber sobre hardware, compatibilidad, ensamblaje, marcas y mucho más — con respuestas precisas, personalizadas y en tiempo real.

<p>

[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-21-DD0031.svg)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org)
[![AI Agent](https://img.shields.io/badge/AI-Agentic-blueviolet.svg)]()
[![RAG](https://img.shields.io/badge/RAG-Enabled-success.svg)]()
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8.svg)]()
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN%20%7C%20PT-orange.svg)]()

</p>

<p>

**¿Te fue útil este proyecto?**

[![⭐ Dale una estrella](https://img.shields.io/github/stars/yerssondavidf/DaddySrPCFrontend?style=social)](https://github.com/yerssondavidf/DaddySrPCFrontend/stargazers)
[![Fork](https://img.shields.io/github/forks/yerssondavidf/DaddySrPCFrontend?style=social)](https://github.com/yerssondavidf/DaddySrPCFrontend/fork)

Una estrella ayuda al proyecto a llegar a más personas. ¡Gracias! 🙌

</p>

</div>

---

## ¿Qué es Daddy Sr.PC?

Daddy Sr.PC es un **agente de IA conversacional enfocado 100% en el ecosistema PC**.

No es un chatbot genérico. Es un asistente especializado que te acompaña durante todo el proceso: desde que tienes una duda sobre compatibilidad, hasta que encuentras el build perfecto para tu presupuesto. Daddy Sr.PC combina razonamiento profundo con información técnica actualizada para darte respuestas confiables y personalizadas.

Puede ayudarte con:

- **Ensamblaje de PC** — guías paso a paso, qué comprar primero, cómo instalar componentes
- **Compatibilidad** — CPU + Motherboard, RAM + plataforma, GPU + fuente de poder
- **Builds por presupuesto** — recomendaciones reales ajustadas a tu bolsillo y objetivo
- **Comparaciones de hardware** — CPUs, GPUs, SSDs, RAMs, fuentes, gabinetes
- **Troubleshooting** — PC que no enciende, crashes, temperaturas altas, pantalla azul
- **BIOS y drivers** — versiones, actualizaciones, configuraciones de XMP/EXPO
- **Overclocking y tuning** — estabilidad, voltajes, perfiles de memoria
- **Marcas y mercado** — qué marca elegir, reputación, relación precio-calidad
- **Preguntas frecuentes** — dudas comunes del mundo PC respondidas con precisión
- **PCs para gaming, workstation o uso general** — recomendaciones según tu uso real

---

## ¿Por qué es diferente?

La mayoría de los asistentes de IA responden preguntas de PC usando únicamente el conocimiento interno del modelo de lenguaje — que puede estar desactualizado o simplemente equivocado.

Daddy Sr.PC va mucho más lejos:

- Recupera documentación técnica actualizada mediante **RAG**
- Usa herramientas agénticas para acceder a **información en tiempo real**
- Mantiene **memoria de conversación** para personalizar cada respuesta según tu configuración actual
- Reduce significativamente las alucinaciones al combinar contexto recuperado con razonamiento

El resultado: respuestas más precisas, más honestas y más útiles.

---

## Ejemplos de preguntas que puedes hacer

```text
¿El RTX 5070 es compatible con un Ryzen 5 7600?

¿Qué fuente de poder necesito para esta build?

Mi PC se reinicia sola al jugar. ¿Qué puede ser?

Arma una PC para gaming 1440p con $1000 de presupuesto.

¿Cuál es mejor: RTX 5070 o RX 9070 XT?

¿Qué versión de BIOS soporta los Ryzen 9000?

¿Vale la pena el DDR5 sobre DDR4 en 2025?

¿Cómo activo XMP/EXPO en mi placa?

¿Qué diferencia hay entre un cooler de 120mm y uno de 240mm?

¿Cuál SSD tiene mejor relación precio-velocidad ahora mismo?
```

---

## ✨ Características principales

- 🤖 **Arquitectura agéntica** — el agente decide qué herramientas usar para cada consulta
- 📚 **RAG integrado** — recupera contexto técnico relevante antes de responder
- 🧠 **Memoria de conversación** — recuerda tu setup y preferencias a lo largo del chat
- 🌐 **Datos en tiempo real** — conectado a fuentes confiables de hardware
- 💬 **Conversación natural** — no necesitas saber tecnicismos para interactuar
- 🌍 **Multilenguaje** — disponible en Español, Inglés y Portugués
- 📱 **PWA** — instalable como aplicación en cualquier dispositivo
- 🎨 **Tema claro/oscuro** — UI adaptable a tu preferencia

---

## 🧠 Cómo funciona

```text
         Pregunta del usuario
                │
                ▼
      Capa de planeación del agente
                │
      ┌─────────┴──────────┐
      │                    │
      ▼                    ▼
 Base de conocimiento   Herramientas agénticas
 (RAG + Vector DB)           │
      │              ┌──────┴──────┐
      │              │             │
      ▼              ▼             ▼
 Hardware DB    APIs confiables  Datos en vivo
      │
      └─────────────┬─────────────┘
                    ▼
          Generación de respuesta (LLM)
                    ▼
         Respuesta final personalizada
```

---

## 🛠️ Tech Stack

### Frontend (este repositorio)

| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 21 | Framework principal |
| TypeScript | 5.9 | Tipado estático |
| Transloco | — | Internacionalización (i18n) |
| RxJS | — | Programación reactiva |
| Vitest | — | Unit testing |
| PWA | — | Instalación y offline support |

### Backend

| Tecnología | Propósito |
|---|---|
| Java 21 | Runtime del servidor |
| Spring Boot 3.x | Framework backend |
| Spring AI | Integración con LLMs y herramientas |
| OpenAI Compatible APIs | Modelo de lenguaje |

### Infraestructura de IA

| Componente | Propósito |
|---|---|
| Agentic AI | Planeación y ejecución de herramientas |
| RAG | Recuperación aumentada de conocimiento |
| Vector Database | Búsqueda semántica |
| Conversation Memory | Contexto persistente por sesión |
| Tool Calling | Acceso a datos externos en tiempo real |

### Infraestructura

| Componente | Propósito |
|---|---|
| Docker | Contenedorización |
| PostgreSQL | Base de datos principal |
| REST APIs | Comunicación cliente-servidor |

---

## 📦 Estructura del repositorio

```text
DaddySrPCFrontend/
├── public/                 # Assets estáticos (logo, iconos, i18n, PWA)
│   ├── i18n/               # Traducciones (es, en, pt)
│   ├── flags/              # Íconos de idiomas
│   └── logo.png            # Logo de la aplicación
├── src/
│   ├── app/
│   │   ├── core/           # Servicios globales (theme, i18n)
│   │   ├── features/       # Páginas principales (landing, login, chat...)
│   │   └── shared/         # Componentes reutilizables
│   └── styles/             # Design tokens y estilos globales
├── angular.json
├── package.json
└── README.md
```

---

## 🚀 Desarrollo local

### Requisitos

- Node.js 20+
- Angular CLI 21+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/yerssondavidf/DaddySrPCFrontend.git
cd DaddySrPCFrontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200/` y se recargará automáticamente con cada cambio.

### Comandos útiles

```bash
# Generar un nuevo componente
ng generate component nombre-componente

# Build de producción
ng build

# Ejecutar unit tests
ng test

# Ejecutar tests e2e
ng e2e
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Haz un **Fork** del repositorio
2. Crea una rama para tu feature: `git checkout -b feat/mi-feature`
3. Haz commit de tus cambios: `git commit -m "feat: descripción"`
4. Abre un **Pull Request**

Por favor, revisa las convenciones de commits antes de contribuir.

---

## ⭐ Apoya el proyecto

Si Daddy Sr.PC te fue útil o simplemente te parece un proyecto interesante:

| Acción | Por qué importa |
|---|---|
| ⭐ **[Dale una estrella](https://github.com/yerssondavidf/DaddySrPCFrontend/stargazers)** | Ayuda a que más personas lo descubran |
| 🍴 **[Haz un Fork](https://github.com/yerssondavidf/DaddySrPCFrontend/fork)** | Contribuye o adáptalo a tus necesidades |
| 🐞 **[Reporta un bug](https://github.com/yerssondavidf/DaddySrPCFrontend/issues)** | Ayúdanos a mejorar la calidad |
| 💡 **[Sugiere una feature](https://github.com/yerssondavidf/DaddySrPCFrontend/issues/new)** | Tu idea puede ser el próximo update |
| 📢 **Compártelo** | Cuéntale a alguien que lo necesite |

---

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Esto significa que eres libre de usar, modificar y distribuir este software, siempre y cuando cualquier trabajo derivado también sea distribuido bajo la misma licencia — incluyendo el uso en servicios en red (SaaS).

Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ para la comunidad PC

[⭐ Star en GitHub](https://github.com/yerssondavidf/DaddySrPCFrontend/stargazers) · [🍴 Fork](https://github.com/yerssondavidf/DaddySrPCFrontend/fork) · [🐞 Issues](https://github.com/yerssondavidf/DaddySrPCFrontend/issues)

</div>
