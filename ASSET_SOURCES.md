# Fuentes de recursos

Registro de todo recurso visual o tipográfico usado en el portafolio, con su
origen, licencia y uso.

**Este proyecto no utiliza fotografías de stock ni imágenes descargadas.** Cada
visual está generado con código (SVG, CSS o WebGL), por lo que no hay archivos
binarios que licenciar, descargar ni optimizar.

---

## Tipografías

| Fuente         | Autor / Fundición            | Licencia                | Uso                       | Entrega                        |
| -------------- | ---------------------------- | ----------------------- | ------------------------- | ------------------------------ |
| Space Grotesk  | Florian Karsten              | SIL Open Font License 1.1 | Títulos y display        | `next/font/google` (auto-alojada) |
| Inter          | Rasmus Andersson             | SIL Open Font License 1.1 | Texto corrido            | `next/font/google` (auto-alojada) |
| JetBrains Mono | JetBrains                    | SIL Open Font License 1.1 | Etiquetas técnicas, código, terminal | `next/font/google` (auto-alojada) |

`next/font` descarga y sirve los archivos desde el propio dominio en tiempo de
build: no hay peticiones a Google Fonts en producción y no hay layout shift.

---

## Iconografía

| Recurso        | Autor        | Licencia | Uso                                   |
| -------------- | ------------ | -------- | ------------------------------------- |
| lucide-react   | Lucide Contributors | ISC | Iconos de interfaz (menú, flechas, correo, candado, etc.) |

### Marcas de terceros

`lucide-react` v1 retiró los iconos de marca, por lo que los glifos de GitHub y
LinkedIn se dibujan en línea en `src/components/ui/BrandIcons.tsx`.

| Marca    | Titular              | Uso en este proyecto                                    |
| -------- | -------------------- | ------------------------------------------------------- |
| GitHub   | GitHub, Inc.         | Enlace nominativo al perfil propio de Santos Enmanuel.   |
| LinkedIn | LinkedIn Corporation | Enlace nominativo al perfil propio de Santos Enmanuel.   |

Son marcas registradas de sus titulares. Se emplean únicamente de forma
nominativa —para identificar el destino de un enlace al perfil personal— sin
sugerir afiliación, patrocinio ni respaldo. Los trazos son reconstrucciones
geométricas simples, no archivos de marca oficiales.

---

## Recursos generados en el proyecto

Todos son código fuente propio. Licencia: la del repositorio.

| Recurso                    | Archivo                                             | Técnica          |
| -------------------------- | --------------------------------------------------- | ---------------- |
| Monograma `SE`             | `src/components/ui/Monogram.tsx`                    | SVG              |
| Favicon                    | `src/app/icon.svg`, `public/icon.svg`               | SVG              |
| Apple touch icon           | `src/app/apple-icon.tsx`                            | `next/og`        |
| Imagen Open Graph          | `src/app/opengraph-image.tsx`                       | `next/og`        |
| Escena 3D del hero         | `src/components/three/HeroScene.tsx`                | Three.js / R3F   |
| Fallback del hero          | `src/components/three/HeroFallback.tsx`             | SVG + CSS        |
| Escena de carretera (VialAI) | `src/components/showreel/RoadStage.tsx`           | SVG + gradientes |
| Pipeline documental        | `src/components/showreel/PipelineStage.tsx`         | SVG              |
| Panel analítico            | `src/components/showreel/DashboardStage.tsx`        | SVG              |
| Terminal / núcleo local    | `src/components/showreel/TerminalStage.tsx`         | SVG + CSS        |
| Estratos y pozo            | `src/components/projects/visuals/WellStrata.tsx`    | SVG              |
| Tarjetas QR                | `src/components/projects/visuals/QrCards.tsx`       | CSS + SVG        |
| Arena pixel art (Hitdash)  | `src/components/projects/visuals/PixelArena.tsx`    | SVG `crispEdges` |
| Grano de película          | `globals.css` (`.grain-overlay`)                    | `feTurbulence` SVG inline |

El código QR de `QrCards.tsx` es un patrón decorativo determinista, **no un
código escaneable**.

---

## Pendientes

Cuando Santos aporte capturas reales de VialAI, los dashboards o las landings
entregadas:

1. Colocarlas en `public/projects/<slug>/`.
2. Servirlas con `next/image` y dimensiones explícitas (evita CLS).
3. Exportar en AVIF o WebP.
4. Registrarlas en esta tabla indicando autoría y permiso de publicación.
5. Confirmar que ninguna captura expone datos de clientes, información
   confidencial ni credenciales — especialmente en el proyecto marcado como
   confidencial.
