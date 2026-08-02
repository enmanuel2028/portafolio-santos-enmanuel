# Portafolio — Santos Enmanuel Manosalva Aceros

Portafolio cinematográfico de **Santos Enmanuel Manosalva Aceros**, ingeniero de
sistemas e informática y desarrollador enfocado en software, inteligencia
artificial, visión por computador y analítica de datos.

Bilingüe (español / inglés), oscuro, con una escena WebGL adaptativa, un
recorrido narrativo ligado al scroll y siete casos de estudio completos.

---

## Stack

| Área         | Tecnología                                        |
| ------------ | ------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)                |
| UI           | React 19 · TypeScript estricto                    |
| Estilos      | Tailwind CSS v4 (tokens en `globals.css`)         |
| Scroll / narrativa | GSAP 3 + ScrollTrigger                      |
| Microinteracciones | Motion for React                            |
| 3D           | Three.js · @react-three/fiber · @react-three/drei |
| Iconos       | lucide-react (+ marcas propias en `BrandIcons`)   |
| Calidad      | ESLint 9 · Prettier · Vitest · Playwright         |

---

## Requisitos

- Node.js ≥ 20.9
- npm ≥ 10

## Instalación

```bash
npm install
```

> **Nota sobre este entorno:** la carpeta del proyecto tiene permisos de solo
> lectura para procesos de shell (grupo `CodexSandboxUsers`), por lo que
> `npm install` debe ejecutarse desde una terminal propia del usuario. Ver
> `PROJECT_STATUS.md`.

## Ejecución

```bash
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
```

## Calidad

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test:unit  # Vitest (contenido e i18n)
npm run test:e2e   # Playwright (navegación, móvil, idioma, reduced motion)
npm run check      # lint + typecheck + unit
```

Playwright necesita el navegador una sola vez:

```bash
npm run test:e2e:install
```

---

## Variables de entorno

Una sola, opcional:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Si no se define, se usa el valor por defecto en `src/content/personal.ts`.
Afecta a canonical, Open Graph, `sitemap.xml` y `robots.txt`.

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # layout raíz (pass-through)
│   ├── page.tsx                # "/" → redirige al idioma por defecto
│   ├── globals.css             # tokens de diseño + utilidades
│   ├── icon.svg, apple-icon.tsx, opengraph-image.tsx
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── [locale]/
│       ├── layout.tsx          # <html lang>, providers, nav, footer
│       ├── page.tsx            # portada (todas las secciones)
│       ├── not-found.tsx
│       └── projects/
│           ├── page.tsx        # índice de proyectos
│           └── [slug]/page.tsx # caso de estudio
├── components/
│   ├── layout/                 # Navbar, Footer, Preloader, Cursor, Overlays…
│   ├── sections/               # Hero, About, Showreel, Projects, Timeline…
│   ├── projects/               # tarjetas y visuales generados
│   ├── showreel/               # las 4 escenas del recorrido
│   ├── three/                  # canvas, escena y fallback
│   ├── providers/              # ExperienceProvider
│   └── ui/                     # Button, Tag, SectionHeader, Monogram…
├── content/                    # ← TODO EL CONTENIDO EDITABLE
│   ├── personal.ts             # datos personales y enlaces
│   ├── projects.ts             # los 7 proyectos y sus casos
│   ├── experience.ts           # trayectoria
│   ├── skills.ts               # áreas técnicas
│   ├── lab.ts                  # Technology Lab
│   └── seo.ts                  # metadatos y datos estructurados
├── hooks/                      # useActiveSection, useMediaQuery…
├── i18n/                       # locales, diccionario de UI
├── lib/                        # gsap, tokens de animación, capacidades
└── types/                      # contratos de contenido
```

---

## Gestión del contenido

**Todo el texto vive en `src/content/`. No hay copy dentro de los componentes.**

Cada campo traducible usa el envoltorio `L<T>`:

```ts
summary: {
  es: "Texto en español",
  en: "English text",
}
```

### Añadir un proyecto

1. Añade una entrada al array `projects` en `src/content/projects.ts`,
   respetando la interfaz `Project` (`src/types/content.ts`).
2. Asigna `slug`, `index` (`"08"`), `accent` y `visual`.
3. Si necesitas un visual nuevo:
   - crea el componente en `src/components/projects/visuals/`,
   - añade la clave a `VisualKind` en `src/types/content.ts`,
   - regístralo en `src/components/projects/ProjectVisual.tsx`.
4. Si el acento es nuevo, añádelo a `AccentName` y define su par
   `--accent` / `--accent-soft` en `globals.css`.

La página `/[locale]/projects/[slug]` y el sitemap se generan solos.

### Configurar los enlaces de contacto

En `src/content/personal.ts`:

```ts
export const personalLinks: PersonalLinks = {
  email: "",       // "santos@ejemplo.com"
  linkedin: "",    // "https://www.linkedin.com/in/usuario"
  github: "",      // "https://github.com/usuario"
  whatsapp: "",    // "https://wa.me/57XXXXXXXXXX"
  cv: "",          // "/cv-santos-enmanuel.pdf" (coloca el PDF en public/)
};
```

**Los botones cuyo valor esté vacío no se renderizan.** Nunca aparece un enlace
roto: si no hay ninguno configurado, la sección de contacto muestra un mensaje
en lugar de botones falsos.

---

## Animaciones

El reparto entre GSAP, Motion y R3F está documentado en
[`ANIMATION_SYSTEM.md`](./ANIMATION_SYSTEM.md).

Para ajustar tiempos globales, edita `src/lib/motion-tokens.ts` — no uses
valores sueltos dentro de los componentes.

---

## Activar o desactivar el 3D

La escena se decide en `src/components/three/HeroCanvas.tsx`. Solo se monta un
canvas si se cumple **todo**:

- la hidratación terminó,
- WebGL está disponible,
- el usuario no pidió movimiento reducido ni desactivó los efectos,
- el dispositivo no cayó en el nivel `low`.

En cualquier otro caso se muestra `HeroFallback` (CSS + SVG, sin canvas).

Para desactivarlo por completo, devuelve `<HeroFallback />` al inicio de
`HeroCanvas`. Para cambiar los umbrales de calidad, edita `detectTier()` en
`src/lib/capabilities.ts`.

El visitante también puede apagar los efectos desde el botón de la barra
superior; la elección se guarda en `localStorage`.

---

## Despliegue

### Vercel (recomendado)

1. Importa el repositorio.
2. Define `NEXT_PUBLIC_SITE_URL` con el dominio final.
3. Deploy. Framework, build y salida se detectan automáticamente.

### Cualquier host con Node

```bash
npm ci
npm run build
npm run start     # sirve en el puerto 3000
```

### Export estático

Todas las rutas son estáticas (SSG). Si quieres archivos planos, añade
`output: "export"` a `next.config.ts`. Ten en cuenta que `opengraph-image` y
`apple-icon` se generan en build, lo cual es compatible con el export.

Antes de publicar, revisa la lista de pendientes en
[`PROJECT_STATUS.md`](./PROJECT_STATUS.md).

---

## Documentación adicional

- [`ANIMATION_SYSTEM.md`](./ANIMATION_SYSTEM.md) — sistema de movimiento.
- [`ASSET_SOURCES.md`](./ASSET_SOURCES.md) — origen y licencia de recursos.
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) — estado, pendientes y datos por completar.
- `.claude/agents/` — roles especializados para trabajar sobre este repositorio.
