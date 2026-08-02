# Sistema de animación

Este documento define qué librería controla qué, con qué tiempos, y cómo se
comporta todo cuando el usuario pide menos movimiento.

La regla que sostiene el resto: **nunca dos librerías animan la misma propiedad
del mismo elemento.**

---

## 1. Reparto de responsabilidades

### GSAP + ScrollTrigger

Narrativa ligada al scroll y revelados complejos.

| Uso                        | Dónde                                  |
| -------------------------- | -------------------------------------- |
| Timeline de entrada del hero | `components/sections/Hero.tsx`        |
| Máscaras de texto (`clip-path`) | `Hero.tsx`                        |
| Secuencia fijada del showreel | `components/sections/Showreel.tsx`   |
| Pinning y cross-fade entre escenas | `Showreel.tsx`                  |

Registro de plugins: **solo** en `src/lib/gsap.ts`.

### Motion for React

Estado de componente e interacción.

| Uso                          | Dónde                              |
| ---------------------------- | ---------------------------------- |
| Hover y tap de botones       | `ui/Button.tsx`                    |
| Indicador activo de la nav (`layoutId`) | `layout/Navbar.tsx`     |
| Menú móvil (`AnimatePresence`) | `layout/Navbar.tsx`              |
| Pantalla de carga            | `layout/Preloader.tsx`             |
| Entradas por scroll (`whileInView`) | secciones y tarjetas         |
| Filtros de proyectos (`layoutId`) | `sections/Projects.tsx`       |

### React Three Fiber

Solo la escena del hero. Ver `threejs-engineer` en `.claude/agents/`.

### CSS

Bucles decorativos y transiciones simples: `pulse-ring`, `scan-sweep`, `drift`,
`caret`, `flow-dash`, hover de color y borde. Definidos en `globals.css` y
desactivados en bloque por la media query de movimiento reducido.

---

## 2. Tokens

Fuente única: `src/lib/motion-tokens.ts`.

### Duraciones (segundos)

| Token     | Valor | Uso                                  |
| --------- | ----- | ------------------------------------ |
| `hover`   | 0.2   | respuesta a hover / press            |
| `micro`   | 0.32  | toggles, chips, indicadores          |
| `enter`   | 0.7   | entrada de elementos en una sección  |
| `section` | 1.1   | transiciones de sección, revelados grandes |

Las escenas cinematográficas no tienen duración fija: están ligadas al scroll.

### Easing

| Token       | Curva                        | Uso                     |
| ----------- | ---------------------------- | ----------------------- |
| `ease.out`  | `cubic-bezier(0.16,1,0.3,1)` | entradas                |
| `ease.inOut`| `cubic-bezier(0.76,0,0.24,1)`| transiciones simétricas |
| `ease.soft` | `cubic-bezier(0.22,.61,.36,1)`| superficies grandes    |

Sin rebotes. Sin `elastic`. Sin `back`.

Equivalentes GSAP en `gsapEase`: `expo.out`, `power4.inOut`, `power2.out`.

### Stagger

`tight` 0.04 · `normal` 0.08 · `loose` 0.14

---

## 3. Higiene de GSAP

Patrón obligatorio en todo componente animado:

```ts
useIsomorphicLayoutEffect(() => {
  if (!ready) return;

  const ctx = gsap.context(() => {
    if (!motionEnabled) {
      gsap.set("[data-reveal]", { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 });
      return;
    }
    // timeline…
  }, rootRef);

  return () => ctx.revert();
}, [motionEnabled, ready]);
```

- `gsap.context(fn, ref)` limita los selectores al subárbol y permite un
  `revert()` que mata tweens, ScrollTriggers y estilos inline de una vez.
- `gsap.matchMedia()` para recorridos responsive: se destruye solo cuando la
  media query deja de aplicar.
- `invalidateOnRefresh: true` en triggers con `pin`.
- `ScrollTrigger.refresh()` tras `document.fonts.ready` y tras `window.load`.
  Sin esto, un pin medido antes de que carguen las fuentes empieza en el
  desplazamiento equivocado y produce saltos.

---

## 4. Movimiento reducido

Tres orígenes, un mismo resultado:

1. `prefers-reduced-motion: reduce` del sistema operativo.
2. El botón de efectos de la barra superior (persistido en `localStorage`).
3. Nivel de calidad `low` por capacidades del dispositivo.

`useExperience()` los combina en `motionEnabled` y `tier`.

### Qué cambia

| Elemento            | Con movimiento completo   | Reducido                          |
| ------------------- | ------------------------- | --------------------------------- |
| Intro               | ~2.3 s, una vez por sesión | No se monta                       |
| Hero                | Máscara + parallax        | Estado final directo              |
| Showreel            | Sección fijada, 4 escenas | Lista estática con las 4 escenas  |
| Escena 3D           | Canvas WebGL              | `HeroFallback` (CSS + SVG)        |
| Cursor personalizado| Activo                    | Cursor nativo                     |
| Grano y viñeta      | Visibles                  | Ocultos                           |
| Entradas por scroll | Desplazamiento + fundido  | Fundido corto (0.2–0.24 s)        |

**Ningún contenido desaparece.** El recorrido largo se sustituye por contenido
legible, nunca por ausencia. Hay una prueba E2E que lo verifica.

Adicionalmente, `globals.css` neutraliza cualquier animación o transición que
se escape, y el `<html>` expone `data-motion` y `data-quality` para que las
capas puramente decorativas puedan apagarse sin JavaScript.

---

## 5. Puntos sensibles de rendimiento

- **Solo `transform` y `opacity`.** Animar `width`, `top`, `margin` o similares
  provoca layout y se considera un error.
- **El pin del showreel** es lo más caro de la página: se desactiva en `low` y
  su recorrido es más corto en móvil (`+=180%` frente a `+=320%`).
- **El cursor** escribe transforms en un bucle `requestAnimationFrame` y no
  toca layout. Solo se monta con puntero fino.
- **`ScrollTrigger.refresh()`** es costoso: llamarlo en carga de fuentes y
  `load`, nunca en cada scroll.
- **Grano y viñeta** son capas fijas `pointer-events: none` y solo existen en
  el nivel `high`.
- **El canvas** se pausa en pestañas ocultas (`frameloop="never"`).
