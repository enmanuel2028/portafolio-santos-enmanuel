# Estado del proyecto

Última actualización: 2 de agosto de 2026.

---

## 1. Implementado y verificado

### Infraestructura

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript en modo estricto
  (`noUncheckedIndexedAccess`, `noUnusedLocals`, sin `any`).
- Tailwind CSS v4 con tokens de diseño centralizados en `globals.css`.
- ESLint 9 (flat config) + Prettier.
- Vitest para el contenido, Playwright para navegación.

### Rutas (26 páginas prerenderizadas)

| Ruta                          | Tipo |
| ----------------------------- | ---- |
| `/`                           | redirección a `/es` |
| `/[locale]`                   | portada (es, en) |
| `/[locale]/projects`          | índice de proyectos |
| `/[locale]/projects/[slug]`   | 7 casos × 2 idiomas = 14 páginas |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | metadatos |
| `/opengraph-image`, `/apple-icon`, `/icon.svg` | imágenes generadas |

### Secciones

Pantalla de carga · navegación sticky con sección activa · hero cinematográfico
con escena 3D · perfil · showreel fijado de 4 escenas · 7 proyectos con filtros
por categoría · trayectoria · tecnologías por área · Technology Lab · contacto ·
footer.

### Sistema visual y de movimiento

- Paleta oscura con acento por proyecto vía `data-accent`.
- Tres familias tipográficas auto-alojadas con `next/font`.
- GSAP para la narrativa de scroll, Motion para la interacción, R3F para el 3D.
- Tres niveles de calidad (`high` / `medium` / `low`) con detección conservadora.
- Fallback CSS + SVG completo cuando no hay WebGL.
- Botón para desactivar efectos, persistido en `localStorage`.

### Accesibilidad

- Enlace para saltar al contenido como primera parada de tabulación.
- Un solo `h1` por página y jerarquía de encabezados sin saltos (verificado).
- Menú móvil con `role="dialog"`, focus trap, cierre con `Escape` y
  restauración del foco.
- Foco visible global, `aria-label` en botones de icono, `aria-pressed` en toggles.
- `prefers-reduced-motion` respetado sin ocultar contenido.

### SEO

Canonical por idioma, `hreflang` (es, en, x-default), Open Graph, Twitter card,
datos estructurados `Person` e `ItemList` de proyectos, sitemap y robots.

---

## 2. Resultados de las pruebas

Ejecutadas el 2 de agosto de 2026 sobre un build de producción real.

| Comprobación         | Resultado |
| -------------------- | --------- |
| `tsc --noEmit`       | ✅ sin errores |
| `eslint .`           | ✅ sin errores ni avisos |
| `next build`         | ✅ 26 páginas generadas |
| Vitest               | ✅ 12/12 |
| Playwright (desktop) | ✅ 14/14 |
| Playwright (móvil)   | ✅ 14/14 |
| Errores de consola   | ✅ ninguno (aserción explícita en la suite) |
| Scroll horizontal    | ✅ ausente a 390 px |
| SSR sin JavaScript   | ✅ ~66 000 caracteres de texto renderizado |

---

## 3. Datos que debe proporcionar Santos

### Prioridad alta — bloquean el despliegue público

Todos en `src/content/personal.ts`. **Mientras estén vacíos, sus botones
simplemente no se muestran; no hay enlaces rotos.**

| Dato       | Campo                 | Formato esperado                     |
| ---------- | --------------------- | ------------------------------------ |
| Correo     | `personalLinks.email` | `santos@ejemplo.com`                 |
| LinkedIn   | `personalLinks.linkedin` | `https://www.linkedin.com/in/usuario` |
| GitHub     | `personalLinks.github` | `https://github.com/usuario`        |
| WhatsApp   | `personalLinks.whatsapp` | `https://wa.me/57XXXXXXXXXX`      |
| CV         | `personalLinks.cv`    | `/cv-santos-enmanuel.pdf` + el PDF en `public/` |
| Dominio    | `NEXT_PUBLIC_SITE_URL` | dominio final de producción         |

### Prioridad media

- **Enlaces de proyectos.** `demoUrl` y `repositoryUrl` están sin definir en los
  siete proyectos. Al rellenarlos aparecen los botones correspondientes; si no,
  se muestra una nota honesta de que están pendientes.
  No añadir enlaces al proyecto marcado como confidencial.
- **Fechas reales.** `src/content/experience.ts` usa periodos relativos
  ("Formación en curso", "Proyecto continuo") porque no había fechas
  confirmadas. Sustituir por rangos reales cuando se confirmen.
- **Año de cada proyecto.** El campo `year` es opcional y está sin usar.

### Prioridad baja

- **Capturas reales** de VialAI, dashboards y landings entregadas. Hoy cada
  proyecto usa una representación generada con código. Ver `ASSET_SOURCES.md`
  para el procedimiento.
- **Revisión del inglés** por parte de Santos: las traducciones son completas y
  naturales, pero conviene que valide el tono de su marca personal.
- **Verificar Hitdash**: si el repositorio es público, añadir `repositoryUrl`.

---

## 4. Restricción del entorno actual

La carpeta del proyecto tiene una ACL que concede al grupo `CodexSandboxUsers`
solo permisos de **lectura y ejecución**:

```
Enma\CodexSandboxUsers    ReadAndExecute
Enma\acero                FullControl
```

Los procesos de shell del asistente corren bajo ese grupo, por lo que **no
pudieron escribir `node_modules/` ni `.next/` dentro del proyecto**.

**Consecuencia práctica:** el árbol de dependencias no está instalado en esta
carpeta. Santos debe ejecutar una vez, desde su propia terminal:

```bash
cd C:\Users\acero\Documents\portafolio
npm install
npm run dev
```

Todo el código fue instalado, compilado, tipado, linteado y probado en una copia
espejo con permisos de escritura, usando exactamente estos mismos archivos y
este mismo `package.json`. Los resultados de la sección 2 provienen de esa
ejecución real, no de una estimación.

---

## 5. Mejoras futuras

- Vistas previas reales de proyecto con `next/image` cuando haya capturas.
- Formulario de contacto con backend (hoy son enlaces directos, sin
  dependencias de terceros ni recolección de datos).
- Blog o notas técnicas bajo `/[locale]/notes`.
- Auditoría Lighthouse sobre el dominio de producción una vez desplegado.
- `View Transitions` entre la lista de proyectos y el caso de estudio.
- Tema claro opcional (los tokens ya están centralizados, el trabajo sería
  definir la paleta clara y su contraste).
