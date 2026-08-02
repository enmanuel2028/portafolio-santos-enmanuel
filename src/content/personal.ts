import type { L } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLACEHOLDERS — reemplazar con datos reales
 * ─────────────────────────────────────────────────────────────────────────────
 *  Los valores vacíos ("") son intencionales. La UI **oculta automáticamente**
 *  cualquier botón o enlace cuyo valor esté vacío, de modo que nunca se publica
 *  un enlace roto ni un dato inventado.
 *
 *  Para activar un canal de contacto, basta con rellenar su cadena aquí.
 *  Ver `PROJECT_STATUS.md` para la lista completa de pendientes.
 */
export interface PersonalLinks {
  /** Ej: "santos@ejemplo.com" */
  email: string;
  /** Ej: "https://www.linkedin.com/in/usuario" */
  linkedin: string;
  /** Ej: "https://github.com/usuario" */
  github: string;
  /** URL completa wa.me. Ej: "https://wa.me/573000000000" */
  whatsapp: string;
  /** Colocar el PDF en `public/` y apuntar aquí. Ej: "/cv-santos-enmanuel.pdf" */
  cv: string;
}

export const personalLinks: PersonalLinks = {
  email: "",
  linkedin: "",
  github: "",
  whatsapp: "",
  cv: "",
};

export type PersonalLinkKey = keyof PersonalLinks;

/** Dominio canónico de producción. Cambiar antes del despliegue. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://portafolio-santos-enmanuel.manosalvaaceros.workers.dev";

export const personal = {
  firstName: "Santos",
  lastName: "Enmanuel",
  fullName: "Santos Enmanuel Manosalva Aceros",
  monogram: "SE",
  location: {
    es: "Bucaramanga, Colombia",
    en: "Bucaramanga, Colombia",
  } satisfies L<string>,
  availability: {
    es: "Disponible para oportunidades",
    en: "Open to opportunities",
  } satisfies L<string>,
  role: {
    es: "Ingeniero de Sistemas e Informática · Desarrollador de Software",
    en: "Systems & Computer Engineering · Software Developer",
  } satisfies L<string>,
  disciplines: {
    es: "Ingeniería de Sistemas · IA · Software · Datos",
    en: "Systems Engineering · AI · Software · Data",
  } satisfies L<string>,
  university: {
    es: "Universidad Pontificia Bolivariana, seccional Bucaramanga",
    en: "Universidad Pontificia Bolivariana, Bucaramanga campus",
  } satisfies L<string>,
  headline: {
    es: "Construyo productos donde el software, la inteligencia artificial y los datos trabajan como un solo sistema.",
    en: "I build products where software, artificial intelligence and data work as a single system.",
  } satisfies L<string>,
  intro: {
    es: "Desarrollador e ingeniero de sistemas en formación, enfocado en crear soluciones funcionales, escalables y visualmente claras para problemas reales.",
    en: "Developer and systems engineer in training, focused on building functional, scalable and visually clear solutions for real problems.",
  } satisfies L<string>,
  cinematicStatement: {
    es: "No construyo únicamente interfaces. Diseño sistemas, entreno modelos, conecto datos y convierto ideas complejas en productos tecnológicos que pueden utilizarse en el mundo real.",
    en: "I don't just build interfaces. I design systems, train models, connect data and turn complex ideas into technology products that can be used in the real world.",
  } satisfies L<string>,
  about: {
    lead: {
      es: "Me interesa entender cómo funcionan los sistemas completos: desde la interfaz que utiliza una persona hasta los servicios, datos y modelos que hacen posible cada resultado. He trabajado en proyectos de inteligencia artificial, visión por computador, analítica, procesamiento documental, dashboards, simulación y desarrollo web.",
      en: "I care about how complete systems work: from the interface a person uses to the services, data and models that make every result possible. I have worked on artificial intelligence, computer vision, analytics, document processing, dashboards, simulation and web development projects.",
    } satisfies L<string>,
    approach: {
      es: "Mi enfoque consiste en analizar el problema, diseñar una arquitectura clara y construir una solución que pueda mantenerse, evaluarse y mejorar con el tiempo.",
      en: "My approach is to analyze the problem, design a clear architecture and build a solution that can be maintained, evaluated and improved over time.",
    } satisfies L<string>,
    education: {
      es: "Estudiante de Ingeniería de Sistemas e Informática en la Universidad Pontificia Bolivariana, seccional Bucaramanga, próximo a culminar la formación académica.",
      en: "Systems and Computer Engineering student at Universidad Pontificia Bolivariana, Bucaramanga campus, close to completing the degree.",
    } satisfies L<string>,
    /**
     * Indicadores cualitativos — deliberadamente sin cifras.
     * No añadir porcentajes ni años de experiencia sin confirmación.
     */
    highlights: [
      {
        title: {
          es: "Productos completos",
          en: "End-to-end products",
        },
        description: {
          es: "Del análisis del problema al despliegue, pasando por arquitectura, datos e interfaz.",
          en: "From problem analysis to deployment, covering architecture, data and interface.",
        },
      },
      {
        title: {
          es: "IA aplicada",
          en: "Applied AI",
        },
        description: {
          es: "Modelos de visión por computador y procesamiento documental sobre casos de uso reales.",
          en: "Computer vision and document processing models on real use cases.",
        },
      },
      {
        title: {
          es: "Experiencia SaaS",
          en: "SaaS experience",
        },
        description: {
          es: "Multi-tenant, roles, dashboards por perfil y separación de información por organización.",
          en: "Multi-tenancy, roles, role-aware dashboards and per-organization data isolation.",
        },
      },
      {
        title: {
          es: "Software, datos y modelos",
          en: "Software, data and models",
        },
        description: {
          es: "Integración de pipelines, servicios y modelos dentro de una misma arquitectura.",
          en: "Pipelines, services and models integrated within a single architecture.",
        },
      },
      {
        title: {
          es: "Aprendizaje continuo",
          en: "Continuous learning",
        },
        description: {
          es: "Incorporación rápida de tecnologías nuevas, evaluadas con criterio antes de adoptarlas.",
          en: "Fast adoption of new technologies, evaluated with judgment before committing.",
        },
      },
    ],
  },
} as const;
