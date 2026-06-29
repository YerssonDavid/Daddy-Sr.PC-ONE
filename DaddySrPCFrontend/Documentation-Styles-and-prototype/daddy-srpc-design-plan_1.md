# Daddy Sr.PC — Plan de Diseño Web

**Proyecto:** Landing Page + Chat App para Agente de IA especializado en PC  
**Versión:** 1.0  
**Fecha:** Junio 2026  
**Autor:** Design Lead

---

## 1. Concepto Rector

### Visión General

**"La Mesa de Ensamblaje"** — La web se siente como el banco de trabajo de alguien que domina el armado de PCs. No es soporte técnico corporativo, sino el mentor con las manos sucias de pasta térmica que comparte su experiencia sin jerga innecesaria.

El nombre **Daddy Sr.PC** ya carga esa autoridad cálida ("el que sabe"), así que el diseño la respalda: técnico pero accesible, preciso pero con calle.

### Diferenciación

Deliberadamente evitamos los tres clichés de IA actuales:
- ❌ Cream background + serif display + terracota accent
- ❌ Near-black + acid-green o vermilion puro
- ❌ Broadsheet-style con hairlines + columnas densas

En su lugar, la estética nace del **objeto en sí**: la PCB, el cobre, el solder, los headers de conexión, la serigrafía de componentes.

---

## 2. Sistema de Tokens

### 2.1 Paleta de Colores — Dark (Default)

| Token | Hex | Uso |
|---|---|---|
| `bg-base` | `#0A0E12` | Fondo principal, negro azulado de antiestática |
| `bg-surface` | `#0F161C` | Tarjetas, paneles, contenedores |
| `bg-elevated` | `#16202A` | Estados hover, inputs activos, overlays |
| `solder` | `#3DDC97` | Accent primario (verde de soldadura fresca), CTAs positivas |
| `trace` | `#5BC0EB` | Cian de trazos de circuito, links, datos técnicos |
| `alert` | `#FF6B4A` | Cobre cálido — advertencias, incompatibilidades, errores |
| `text-primary` | `#E8EDF2` | Texto principal, lectura |
| `text-secondary` | `#A8B4C1` | Subtítulos, contexto |
| `text-muted` | `#7A8794` | Captions, metadata, timestamps |
| `border` | `#1E2935` | Divisores, bordes sutiles |

### 2.2 Paleta de Colores — Light

| Token | Hex | Uso |
|---|---|---|
| `bg-base` | `#F2F4F1` | Fondo (blanco de placa serigrafiada) |
| `bg-surface` | `#FFFFFF` | Tarjetas, paneles |
| `bg-elevated` | `#F8FAFB` | Hover, inputs activos |
| `solder` | `#16A572` | Accent primario (verde oscurecido para contraste AA) |
| `trace` | `#1B7FA8` | Cian oscuro (trazos) |
| `alert` | `#E85A3D` | Cobre oscurecido |
| `text-primary` | `#10171D` | Texto principal |
| `text-secondary` | `#4A5568` | Subtítulos |
| `text-muted` | `#8B95A5` | Captions |
| `border` | `#E5E8EB` | Divisores |

**Nota:** Light no es un simple invert. Simula la serigrafía blanca/gris de una PCB sobre fibra de vidrio verde claro.

### 2.3 Tipografía

#### Display Font
- **Familia:** Space Grotesk
- **Pesos:** 700 (titulares), 600 (subencabezados)
- **Uso:** Títulos de secciones, taglines, CTAs grandes
- **Justificación:** Geométrica, técnica, con carácter; ya presente en tu stack Finavex

#### Body Font
- **Familia:** Inter
- **Pesos:** 400 (regular), 500 (énfasis)
- **Uso:** Párrafos, descripciones, copy largo
- **Justificación:** Legible en cualquier tamaño, neutral pero cálida

#### Data Font (Monoespaciada)
- **Familia:** JetBrains Mono
- **Pesos:** 400 (regular), 500 (resaltado)
- **Uso:** Especificaciones técnicas, nombres de componentes, contadores, datos duros
- **Justificación:** Crea jerarquía visual donde "los datos se ven como datos"

#### Escala de Tipo

```
h1: 48px (Space Grotesk, 700, line-height 1.2)
h2: 36px (Space Grotesk, 700, line-height 1.3)
h3: 28px (Space Grotesk, 600, line-height 1.3)
h4: 20px (Space Grotesk, 600, line-height 1.4)

p: 16px (Inter, 400, line-height 1.6)
p-small: 14px (Inter, 400, line-height 1.5)
p-tiny: 12px (Inter, 400, line-height 1.4)

mono: 14px (JetBrains Mono, 400, line-height 1.5)
mono-small: 12px (JetBrains Mono, 400, line-height 1.4)
```

---

## 3. Firma Visual

### Elemento Diferenciador Único

**Trazos de Circuito Animados**

- Líneas finas cian (`#5BC0EB`) que conectan secciones al hacer scroll
- Se "sueldan" (animación de dibujado suave) uniendo componentes conceptualmente relacionados
- Funcionan como el **esquemático de la página que se va completando**
- Aparecen solo en desktop (≥1024px) — respetan `prefers-reduced-motion`
- **Gasto de audacia:** este es el único lugar donde se toma riesgo; todo lo demás disciplinado

### Microinteracciones

1. **Hover en tarjetas:** elevación sutil (sombra, cambio de `bg-surface` a `bg-elevated`), trazo cian se intensifica
2. **Contador de requests:** anima suavemente de un número al siguiente (transición suave `0.3s`)
3. **Envío de mensaje:** animación de "envío" (ícono → checkmark), respuesta aparece con `fade-in`
4. **Links:** underline cian que crece al hover (scaleX)

---

## 4. Arquitectura de Landing Page (Scrollytelling)

### Flujo Visual

```
┌─────────────────────────────────────────────────────────────┐
│ NAV STICKY   Daddy Sr.PC  ◖   [☼/☾ toggle]  [Comenzar]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [HERO] — El chat vivo                                     │
│  ┌──────────────────────┐  ┌──────────────────────────┐    │
│  │ "Arma sin miedo      │  │ ▢ demo de chat vivo      │    │
│  │  a quemar nada"      │  │                          │    │
│  │                      │  │ ▢ tú: ¿RTX 4070 mini?   │    │
│  │ Dejá que Daddy       │  │ ◗ agente: sí, [specs]   │    │
│  │ te guíe en cada      │  │                          │    │
│  │ paso del armado.     │  │ (auto-typing en vivo)    │    │
│  │                      │  │                          │    │
│  │ [Comenzar ahora]     │  │                          │    │
│  └──────────────────────┘  └──────────────────────────┘    │
│       ·· trazo cian baja a sección siguiente ··            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [QUÉ RESUELVE] — 4 dominios interrelacionados             │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Compati- │  │ Ensamble │  │ Técnico  │  │  Guías   │   │
│  │ bilidad  │  │  paso a  │  │   a      │  │          │   │
│  │          │  │  paso    │  │ fondo    │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  (tarjetas con headers de conexión en esquina)             │
│       ·· trazo cian conecta secciones ··                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [CÓMO FUNCIONA] — 01 → 02 → 03 → 04 (secuencia real)     │
│  01 Preguntá lo que quieras                                │
│  02 El agente responde con contexto                        │
│  03 Tenés 15 consultas gratis                              │
│  04 Registrate para seguir sin límites                     │
│       ·· trazo cian conecta ··                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [PRUEBA EN VIVO] — Mini chat embebido                     │
│  (los 15 requests reales se cuentan aquí)                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [CIERRE] Tagline + CTA grande                             │
│  [FOOTER] Mínimo: links, créditos                          │
└─────────────────────────────────────────────────────────────┘
```

### 4.1 Sección HERO

**Componentes:**
- **Headline:** Space Grotesk 48px, "Arma sin miedo a quemar nada"
- **Subheading:** Inter 16px, "Dejá que Daddy te guíe en cada paso del armado."
- **CTA primario:** "Comenzar ahora" (bg-solder, padding 16/32, Border Radius 8px)
- **Demo de chat:** tarjeta elevada con chat vivo que se auto-compone

**Copy del Hero:**
```
Arma sin miedo a quemar nada
Dejá que Daddy te guíe en cada paso del armado.
Preguntas sobre compatibilidad, ensamblaje, técnica — 
Daddy responde todo.

[Comenzar ahora]
```

**Decisión de diseño:** La cosa más característica es *el agente respondiendo*. No mostrar un número grande (plantilla), sino una **demo viva de chat** donde:
1. Aparece una pregunta real ("¿RTX 4070 en miniITX?")
2. La respuesta se va escribiendo en tiempo real (auto-typing)
3. Se ve la precisión y calidez del agente

Esto **vende mostrando, no diciendo**.

### 4.2 Sección QUÉ RESUELVE

**Temáticas (4 tarjetas):**
1. **Compatibilidad de componentes** — ¿Cuál RAM va? ¿Fit en el case? ¿Watts enough?
2. **Guías de ensamblaje paso a paso** — Desde el socket hasta la pasta térmica
3. **Apartado técnico a fondo** — Arquitecturas, benchmarks, generaciones
4. **Mejores prácticas** — Cooling, cable management, ventilación

**Estructura de tarjeta:**
```
┌─ ┐ (header de conexión gráfico cian)
│ ┌─────────────────────┐
│ │ TÍTULO              │
│ │ Descripción breve   │
│ │ (máx 2 líneas)      │
│ └─────────────────────┘
```

Cada tarjeta tiene un ícono SVG mínimalista (tipo circuito) en la esquina superior izquierda.

**Copy:**
```
COMPATIBILIDAD DE COMPONENTES
Verifica socket, RAM, watts, refrigeración. 
Daddy analiza tu combo y te dice si anda.

GUÍAS DE ENSAMBLAJE PASO A PASO
Desde el CPU hasta las pastilla térmica. 
Procedimientos claros para primer armado o upgrade.

APARTADO TÉCNICO A FONDO
TDP, caché L3, velocidades, arquitecturas. 
Todo lo que necesitás saber sobre cada chip.

MEJORES PRÁCTICAS
Cooling, cable management, ventilación, mantención. 
Cuidá tu Setup como Daddy te enseña.
```

### 4.3 Sección CÓMO FUNCIONA

**Estructura numerada (justificada porque es secuencia genuina):**

```
01 PREGUNTÁ LO QUE QUIERAS
   Sin filtros, sin tabú — técnica de novato o debate 
   de overclock, Daddy está listo.

02 AGENTE RESPONDE CON CONTEXTO
   No templates. Explicaciones precisas, data técnica,
   advertencias de seguridad donde hagan falta.

03 TENÉS 15 CONSULTAS GRATIS
   Prueba sin registrarte. Cuenta visible, bajando
   con cada pregunta.

04 REGISTRATE PARA SEGUIR SIN LÍMITES
   Free forever con 15 requests/día, o Premium 
   para unlimited + historial.
```

**Diseño:** Números grandes en mono (JetBrains Mono, `#5BC0EB`), texto en Inter. Los trazos cian conectan cada número con el siguiente.

### 4.4 Sección PRUEBA EN VIVO

Mini chat funcional que cuenta los 15 requests reales. El usuario ve el contador descendiendo con cada mensaje. **Este es el primer contacto real con el producto**.

### 4.5 Cierre + Footer

**Cierre:**
```
Armá con confianza.
Chatea con Daddy Sr.PC ahora.
[Comenzar ahora]
```

**Footer (mínimo):**
```
Daddy Sr.PC © 2026
[Privacidad] [Términos] [Contacto] [GitHub]
```

---

## 5. Flujo de los 15 Requests

### 5.1 Lógica General

```
[Comenzar ahora] en hero → entra al chat sin registrarse
        │
        ▼
   ┌─────────────────────────────────────┐
   │ Chat activo                         │
   │ Contador visible (siempre):         │
   │ ▸ 15/15 (inicio)                    │
   │ ▸ 14/15 (después de Q1)             │
   │ ▸ ...                               │
   └─────────────────────────────────────┘
        │ en 5/15
        ▼ (aviso suave)
   "Quedan 5 preguntas gratis.
    Registrate para unlimited."
   
        │ en 1/15
        ▼ (banner cálido, más visible)
   "Te quedan 1 pregunta.
    [Crear cuenta] para seguir."
   
        │ llega a 0/15
        ▼
   ┌─────────────────────────────────────┐
   │ GATE DE REGISTRO                    │
   │                                     │
   │ "Llegaste al límite de prueba.      │
   │  Seguí preguntando — registrate     │
   │  gratis."                           │
   │                                     │
   │ [Crear cuenta] [Términos]           │
   │                                     │
   │ O recupera sesión si ya tienes uno  │
   └─────────────────────────────────────┘
```

### 5.2 Estados del Contador

| Estado | Requests | Visual | Acciones |
|---|---|---|---|
| Normal | 15-6 | Mono, cian tranquilo | Preguntá normalmente |
| Aviso suave | 5 | Banner info, cian más intenso | Popup: "Últimas preguntas" |
| Aviso fuerte | 1 | Banner cálido (alert), pulse animation | Popup: "Última pregunta" |
| Límite | 0 | Gate blocking + CTA registro | Bloqueado hasta registrarse |

### 5.3 Copy del Gate

```
LLEGASTE AL LÍMITE DE LA PRUEBA

Hiciste 15 preguntas. Bien hecho.

¿Querés seguir? Registrate gratis:
• 15 preguntas/día (Gratis)
• Historial de chats (sin límite)
• Dark mode + exportar respuestas (Premium)

[Crear cuenta gratuita]
o
[Ya tengo cuenta]

────────────────────────────
Nada de sorpresas: Premium es opcional.
La mayoría usa el plan Gratis.
```

**Tono:** Invita, no bloquea. "Seguí preguntando", no "Acceso denegado".

---

## 6. Vista del Chat (App Real)

> 📄 **Documento detallado:** la arquitectura de frontend y el diseño completo de esta
> pantalla (incluida la **cuadrícula animada de fondo**, los componentes Angular, el modelo de
> estado con signals y las microinteracciones) están desarrollados en
> [`daddy-srpc-chat-frontend_2.md`](./daddy-srpc-chat-frontend_2.md).

### 6.1 Layout General

```
┌────────┬──────────────────────────────────────┐
│ SIDE   │ Daddy Sr.PC              ▸ 12/15  ☾ │
│ BAR    ├──────────────────────────────────────┤
│        │                                      │
│ + NEW  │ ◖ tú: ¿AM5 DDR4?                   │
│ CHAT   │                                      │
│        │ ◗ agente: No. AM5 usa DDR5.          │
│        │    DDR4 es para Ryzen 5000/Intel    │
│        │    anteriores.                       │
│        │                                      │
│ Chats  │    ┌──────────────────────┐         │
│ recientes│   │ Socket | DDR Version │         │
│        │    ├──────────────────────┤         │
│        │    │ AM5    | DDR5         │         │
│        │    │ AM4    | DDR4         │         │
│        │    └──────────────────────┘         │
│        │                                      │
│        │ ▢ [Copiar] [↙ Copilot]              │
│        │                                      │
│        ├──────────────────────────────────────┤
│        │ [▢ adjuntar specs]  [escribí...]  → │
│        │                                      │
│        │ [Seleccionar nivel ▼]               │
│        │  ◆ Primer armado                    │
│        │  ◆ Intermedio                       │
│        │  ◆ Avanzado                         │
│        │                                      │
└────────┴──────────────────────────────────────┘
```

### 6.2 Componentes Clave

**Sidebar:**
- Logo + toggle theme + user menu (top)
- "+ NEW CHAT" button (solder accent)
- Historial de chats (scrollable)
- Footer con settings

**Chat Area:**
- Header con nombre agente + contador
- Mensajes: estructura Usuario | Agente con ícono diferente
- Bloques de respuesta con formato estructurado:
  - **Tablas** (compatibilidad)
  - **Listas** (pasos de ensamblaje)
  - **Admoniciones** (warnings en cobre)
  - **Código/Mono** (specs técnicas)
- Input bar con:
  - Attachments (specs de PC)
  - Selector de nivel (personalización)
  - Send button

### 6.3 Personalización (vs genéricos)

**Selector de Nivel:**
```
[Primer armado] ← respuestas ELI5, sin demasiada jerga
[Intermedio]    ← equilibrio entre detalle y claridad
[Avanzado]      ← full técnico, benchmarks, deep dive
```

Este selector se envía con cada mensaje, ajustando el tono y profundidad del agente.

**Formato de Respuestas:**

Bloques estructurados, no párrafos genéricos:

```
◗ ¿Es compatible 7800X3D + RTX 4090?

Sí. Sin problemas. Detalles:

📋 COMPATIBILIDAD
├ Socket: AM5 ✓
├ PCIe: Gen 4.0 (RTX 4090 Gen 4) ✓
├ TDP combined: 162W + 320W = 482W
│  → Recomendamos PSU ≥850W

⚠️ ATENCIÓN
El 7800X3D tiene chipset X870 recomendado
(funciona con X770, pero pierde ventajas
de tuning dinámico).

💾 COMPARABLES
Alternativa más barata: 9800X3D (2025)
```

---

## 7. Responsive Design

### 7.1 Breakpoints

```
Mobile:  0 - 640px
Tablet:  641px - 1024px
Desktop: 1025px+
```

### 7.2 Cambios por Breakpoint

**Mobile (0-640px):**
- Hero: layout vertical, demo de chat debajo del copy
- Tarjetas QUÉ RESUELVE: stack en columna
- Trazos de circuito: deshabilitados (reducen rendimiento)
- Nav: collapso a hamburger
- Font sizes: reducción 10-15%

**Tablet (641-1024px):**
- Hero: 2 columnas, demo más pequeña
- Tarjetas: grid 2x2
- Trazos: habilitados pero simplificados
- Chat sidebar: colapsable

**Desktop (1025px+):**
- Todo a full fidelidad
- Trazos animados completos
- Sidebar siempre visible

---

## 8. Accesibilidad (AA mínimo)

### 8.1 Contraste

- Todos los textos: ratio ≥4.5:1 (AA)
- Iconos + indicators: ratio ≥3:1 (AA)
- Verificados en ambos modos (dark + light)

### 8.2 Interactividad

- ✓ Foco de teclado visible (anillo cian, 2px)
- ✓ Navegación completa con Tab
- ✓ Buttons + links activables con Enter/Space
- ✓ Inputs con labels explícitas
- ✓ Error messages associated con `aria-describedby`

### 8.3 Movimiento

- ✓ Respeta `prefers-reduced-motion`
- ✓ Trazos de circuito se deshabilitan
- ✓ Auto-typing del chat ralentiza (300ms → 800ms)
- ✓ Transiciones CSS se rompen si disabled

### 8.4 Semántica

```html
<header>NAV</header>
<main>
  <section id="hero">
  <section id="features">
  <section id="howit">
  <section id="demo">
</main>
<footer>

<article> para chat messages
<form> con <fieldset> + <legend> para inputs
```

### 8.5 ARIA

- `aria-label` para ícono-only buttons
- `aria-live="polite"` para contador que baja
- `aria-current="page"` en nav active
- `role="status"` para mensajes de confirmación

---

## 9. Performance

### 9.1 Guía de Optimización

**Images:**
- SVG para ícones, trazos, headers de conexión
- WebP para cualquier foto de referencia (fallback JPG)
- Lazy-load de images debajo del fold

**CSS:**
- Crítico inline (hero, nav)
- Resto en sheet externo (defer load)
- Variables CSS para tema (evita duplicados)
- No cascade profundo (especificidad controlada)

**JavaScript:**
- Minimal en landing (solo toggle theme + scroll reveal)
- Chat app carga bajo demanda (code-split)
- Event delegation para múltiples elementos

**Tipografía:**
- Google Fonts (Space Grotesk, Inter) con `font-display: swap`
- JetBrains Mono desde CDN o self-hosted
- Font subsetting si es posible (latin only)

**Targeting:**
- First Contentful Paint (FCP): <2s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1

---

## 10. Micro-interacciones Detalladas

### 10.1 Hero Chat Auto-typing

```
Timeline:
0ms    → mensaje "¿RTX 4070 en miniITX?" aparece
500ms  → usuario ve el mensaje completo
1000ms → agente comienza a "tipear"
        cada letra: 30-50ms de delay
        cursor blink suave
→ respuesta completa: ~3-4s

Efecto: Sensación de conversación real, no robótica.
```

### 10.2 Contador de Requests

```
Click "Enviar" en Q14
→ contador: 15 → 14 (transición suave 0.3s)
→ backend: -1 en DB
→ en 5: popup "Quedan 5 preguntas"
→ en 1: banner full-width cálido
→ en 0: fullscreen gate + CTA registro
```

### 10.3 Hover en Tarjetas

```
Estado normal:
  - bg: bg-surface
  - border: border (suave)
  - shadow: none

Hover:
  - bg: bg-elevated (+1 nivel)
  - border: trace (cian)
  - shadow: 0 8px 24px rgba(93, 192, 235, 0.1)
  - header cian: intensidad ↑
  
Transición: 0.2s ease-out
```

### 10.4 Link Underline Grow

```
Estado normal:
  - underline: none o 0%
  
Hover:
  - underline-width: 100%
  - color: trace

Transición: scaleX(0, 1) en 0.25s
Origen: left
```

---

## 11. Modo Oscuro/Claro

### 11.1 Toggle de Tema

- Ícono en top-right: ☼ (sol) o ☾ (luna)
- Click → transición suave (0.3s)
- Guardado en `localStorage` como `theme: "dark" | "light"`
- Respeta `prefers-color-scheme` en primer load

### 11.2 Transiciones de Color

```css
/* Todas las propiedades de color transicionan */
body, button, a, .card {
  transition: color 0.3s, background-color 0.3s, 
              border-color 0.3s;
}
```

---

## 12. Copy & Tone

### Principios

1. **Active voice:** "Registrate", no "Ser registrado"
2. **Específico, no clever:** "Verifica socket, RAM, watts", no "Descubre el armado perfecto"
3. **Conversacional:** "Daddy responde", no "El sistema de IA responde"
4. **Cálido pero preciso:** Profesional sin jerga innecesaria

### Ejemplos de Copy

**Hero Tagline:**
```
"Arma sin miedo a quemar nada"
(no: "Transforma tu experiencia de armado")
```

**Tarjeta de Compatibilidad:**
```
"Verifica socket, RAM, watts, refrigeración. 
Daddy analiza tu combo y te dice si anda."
(no: "Compatibilidad Inteligente de Componentes")
```

**Gate de Registro:**
```
"Llegaste al límite de la prueba. 
Seguí preguntando — registrate gratis."
(no: "Acceso Denegado. Debe completar registro.")
```

---

## 13. Componentes Reutilizables

### 13.1 Tarjeta Base

```
Propiedades:
- bg: bg-surface
- border: 1px border
- border-radius: 8px
- padding: 24px
- transition: all 0.2s

Estados: normal, hover, active, disabled
```

### 13.2 Button

```
Variantes:
- primary (bg-solder, text-base)
- secondary (border trace, text-trace)
- ghost (transparent, hover underline)

Padding: 12/16 x 16/32 (button)
Border-radius: 8px
Cursor: pointer
Focus: ring cian 2px
```

### 13.3 Input

```
Variantes:
- text (chat input)
- select (nivel selector)

Border: 1px border-color
bg: bg-elevated en focus
Focus: border-trace
Placeholder: text-muted
Padding: 12px 16px
```

### 13.4 Badge/Label

```
Mono font, pequeño (12px)
Padding: 4/8
Border-radius: 4px
Fondo sutilmente tintado (trace, solder, alert)
```

---

## 14. Animation & Easing

### 14.1 Timing Functions

```css
fast: cubic-bezier(0.4, 0, 0.2, 1) /* 0.15s */
normal: cubic-bezier(0.4, 0, 0.2, 1) /* 0.3s */
slow: ease-out /* 0.5s-1s */
```

### 14.2 Animations

**Fade-in:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide-in:**
```css
@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

**Pulse (aviso):**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
animation: pulse 2s infinite;
```

---

## 15. Flujo de Usuario (End-to-End)

### Escenario 1: Nuevo Usuario → Prueba Gratis

```
1. Llega a homepage
   → Ve hero + demo chat
   → Entiende qué es Daddy en 10s
   
2. Click [Comenzar ahora]
   → Navega a /chat
   → Chat vacío, input activo
   → Contador: 15/15 visible
   
3. Tipea: "¿RTX 4060 + Ryzen 5700?"
   → Envía (POST /api/chat)
   → Agente responde en vivo
   → Contador: 14/15
   
4. Hace 14 preguntas más...
   
5. En pregunta 15
   → Contador: 1/15
   → Banner cálido aparece
   
6. Click "Enviar" (pregunta 16)
   → Gate fullscreen: "Llegaste al límite"
   → CTA: [Crear cuenta gratuita]
   
7. Hace click → signup
   → Email + password (o OAuth Google)
   → Confirmación
   → Redirige a /chat (ahora con límite 15/día)
   → Resetea contador a 15/15
```

### Escenario 2: Usuario Registrado

```
1. Login en /login
   → Email + password (o OAuth)
   
2. Dashboard redirige a /chat
   → Historial de chats a la izquierda
   → Contador: 15/15 (o 0/15 si ya pasó el día)
   
3. Continúa chateando normalmente
   
4. Mañana:
   → Contador resetea a 15/15 automáticamente
   → O si es Premium: unlimited
```

---

## 16. Archivos & Estructura

### 16.1 Árbol de Proyecto Recomendado

```
daddy-sr-pc/
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── fonts/
│   │   ├── space-grotesk-*.woff2
│   │   ├── inter-*.woff2
│   │   └── jetbrains-mono-*.woff2
│   └── illustrations/
│       ├── pcb-trace.svg
│       └── component-icons/
│
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── DemoChat.tsx
│   │   ├── Footer.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── pages/
│   │   ├── index.tsx (landing)
│   │   ├── chat.tsx (app)
│   │   ├── login.tsx
│   │   └── signup.tsx
│   │
│   ├── styles/
│   │   ├── globals.css (variables, resets)
│   │   ├── typography.css
│   │   ├── layout.css
│   │   └── animations.css
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── hooks/
│   │       ├── useTheme.ts
│   │       ├── useChat.ts
│   │       └── useRequestCounter.ts
│   │
│   └── constants/
│       ├── colors.ts (token system)
│       ├── typography.ts
│       └── spacing.ts
│
├── .env.local (API_URL, etc)
└── package.json
```

### 16.2 Tech Stack Propuesto

- **Framework:** Angular 21
- **Lenguaje:** TypeScript
- **Styling:** CSS Modules + CSS Variables
- **UI Components:** Radix UI (accesibilidad)
- **Tipografía Web:** Google Fonts + self-hosted fallback
- **API Client:** fetch + React Query (o TanStack Query)
- **Auth:** Almacenamiento de secretos.
- **Deploy:** Vercel (obvio)

---
### 16.3 Recursos propios

-> Logo app - !(logo)[./img/logo.png]
-> Diseño Chat (Prototipo) - !(prototipoChat)[./img/StyleChat.png]

---

## 17. Guía de Implementación (por fase)

### Fase 1: Landing Page
- [ ] Header + Nav
- [ ] Hero + Demo Chat (placeholder)
- [ ] Qué Resuelve (tarjetas)
- [ ] Cómo Funciona
- [ ] Footer
- [ ] Theme toggle (dark/light)
- [ ] Responsive mobile/tablet

### Fase 2: Chat App
- [ ] Autenticación (login/signup)
- [ ] Chat window + input
- [ ] Request counter logic
- [ ] API integration
- [ ] Gate de registro

### Fase 3: Pulido
- [ ] Animaciones (trazos, auto-typing)
- [ ] Optimizaciones (performance)
- [ ] Testing (accessibility, responsive)
- [ ] Analytics

---

## 18. Variantes Futuras

### Pago / Premium
- **Gratis:** 15 requests/día, sin historial
- **Premium:** Unlimited, historial, export, prioridad -> Por el momento solamente con el registro

### Comunidad
- Foro de builds compartidas
- Galería de specs armadas
- Leaderboard de builders

### Integraciones
- Sync con subreddits (r/buildapc, etc)
- Conexión con tiendas (compatibilidad + presupuesto)
- Embed widget en otros blogs

---

## 19. Checklist de QA / Handoff

Antes de launch:

- [ ] **Accesibilidad:** WAVE, Lighthouse, manual testing
- [ ] **Performance:** Lighthouse ≥90 (mobile), ≥95 (desktop)
- [ ] **Responsive:** Probado en 320px, 640px, 1024px, 1920px
- [ ] **Tema:** Dark + Light en todos los estados
- [ ] **Keyboard:** Tab completo, Enter/Space funcionan
- [ ] **Contraste:** AA (4.5:1) en todos los textos
- [ ] **Copy:** Revisado tone of voice
- [ ] **SEO:** Meta tags, OG image, canonical
- [ ] **Cross-browser:** Chrome, Firefox, Safari, Edge

---

## 20. Notas Finales

### Visión

**Daddy Sr.PC** no es un chatbot genérico. Es *el mentor* que está en tu taller. El diseño refleja eso: preciso, técnico, con calidez. Los trazos de circuito no son decoración — son el esquemático de tu aprendizaje armándose.

### Diferenciación Clave

1. **Demo viva en hero** — muestra, no dice
2. **Tipografía técnica (mono)** — los datos *se ven* como datos
3. **Nivel de personalización** — el agente se adapta a ti
4. **Copy cálido** — "Daddy", no "Sistema"
5. **Gate invitador** — "Seguí preguntando", no "Acceso denegado"

### Tono Visual

Paleta basada en la **estética de la PCB** (cian, solder, cobre), tipografía **geométrica pero cálida**, microinteracciones **precisas pero no robóticas**. Minimismo disciplinado con una firma visual memorable.

---

**Versión:** 1.0  
**Última revisión:** Junio 2026  
**Status:** 🟢 Ready for Development Handoff
