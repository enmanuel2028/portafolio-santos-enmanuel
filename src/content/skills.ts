import type { SkillGroup } from "@/types/content";

/**
 * Habilidades agrupadas por área.
 *
 * Deliberadamente sin porcentajes ni barras de nivel: la evidencia de dominio
 * está en los proyectos, no en un número inventado.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "development",
    title: { es: "Desarrollo", en: "Development" },
    description: {
      es: "Construcción de aplicaciones completas, de la interfaz al servicio.",
      en: "Building complete applications, from interface to service.",
    },
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Streamlit",
      "APIs REST",
      "Frontend",
      "Backend",
    ],
  },
  {
    id: "data",
    title: { es: "Datos y bases de datos", en: "Data & databases" },
    description: {
      es: "Modelado, procesamiento y presentación de información.",
      en: "Modeling, processing and presenting information.",
    },
    items: [
      "PostgreSQL",
      "Supabase",
      "SQL",
      "Procesamiento de datos",
      "Modelado de información",
      "Pipelines de datos",
      "Dashboards",
      "Analítica",
    ],
  },
  {
    id: "ai",
    title: { es: "Inteligencia artificial", en: "Artificial intelligence" },
    description: {
      es: "Modelos aplicados a problemas concretos, con evaluación real.",
      en: "Models applied to concrete problems, with real evaluation.",
    },
    items: [
      "Machine learning",
      "Deep learning",
      "Visión por computador",
      "Segmentación de instancias",
      "Mask R-CNN",
      "MobileNet",
      "Procesamiento documental con IA",
      "Gemini",
      "Modelos de lenguaje",
      "Evaluación de modelos",
    ],
  },
  {
    id: "infrastructure",
    title: { es: "Infraestructura y herramientas", en: "Infrastructure & tooling" },
    description: {
      es: "Entornos de trabajo, despliegue y control de versiones.",
      en: "Working environments, deployment and version control.",
    },
    items: [
      "Git",
      "GitHub",
      "Cloudflare Pages",
      "Render",
      "Kaggle",
      "Ollama",
      "OpenCode",
      "VS Code",
      "Linux",
      "Windows",
    ],
  },
  {
    id: "engineering",
    title: { es: "Ingeniería", en: "Engineering" },
    description: {
      es: "Decisiones de diseño que sostienen el sistema en el tiempo.",
      en: "Design decisions that keep a system alive over time.",
    },
    items: [
      "Arquitectura de software",
      "Sistemas distribuidos",
      "Diseño modular",
      "Integración de servicios",
      "Análisis de requerimientos",
      "Diseño de producto",
      "Pruebas",
      "Optimización",
      "Documentación técnica",
    ],
  },
];
