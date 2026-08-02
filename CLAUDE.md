# CLAUDE.md

Guía para trabajar sobre este repositorio.

## Qué es

Portafolio personal de Santos Enmanuel Manosalva Aceros. Next.js 16 (App
Router), React 19, TypeScript estricto, Tailwind v4, GSAP, Motion y React Three
Fiber. Bilingüe es/en, todo prerenderizado.

## Reglas que no se negocian

1. **El contenido vive en `src/content/`.** Nunca escribas copy dentro de un
   componente. Todo campo traducible usa `L<T>` = `{ es, en }`.
2. **Nada inventado.** Sin porcentajes de dominio, sin años de experiencia sin
   confirmar, sin fechas exactas que nadie haya validado, sin métricas de
   negocio. Si falta un dato, se deja vacío y la UI lo oculta.
3. **Sin enlaces rotos.** Un enlace sin configurar no se renderiza. Ver
   `personalLinks` en `src/content/personal.ts`.
4. **Confidencialidad.** El proyecto `analitica-entrenamiento-ventas` está
   marcado `confidential: true`. No añadas nombres internos, prompts, código
   propietario ni enlaces.
5. **Una librería por propiedad.** GSAP para scroll, Motion para interacción,
   CSS para lo simple. Nunca dos animando lo mismo.
6. **Movimiento reducido nunca oculta contenido.** Sustituye el recorrido, no
   lo elimina.

## Comandos

```bash
npm run dev
npm run check      # lint + typecheck + unit
npm run test:e2e   # requiere un build
```

## Antes de dar algo por terminado

```bash
npm run lint && npm run typecheck && npm run build && npm run test:unit
```

La suite E2E incluye una aserción de "cero errores de consola". Si falla,
arregla la causa; no relajes la aserción.

## Roles especializados

`.claude/agents/` contiene cinco perfiles con reglas detalladas:
`creative-director`, `motion-engineer`, `threejs-engineer`,
`performance-auditor`, `qa-accessibility`. Consúltalos antes de tocar su área.

## Nota sobre el entorno

La carpeta del proyecto es de solo lectura para procesos de shell
(`CodexSandboxUsers`). `npm install`, `next build` y Playwright deben ejecutarse
desde una terminal del usuario. Ver sección 4 de `PROJECT_STATUS.md`.
