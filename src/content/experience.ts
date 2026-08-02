import type { TimelineEntry } from "@/types/content";

/**
 * Trayectoria profesional y académica.
 *
 * NOTA: los periodos se expresan en términos relativos ("Formación en curso",
 * "Proyecto continuo") porque no se dispone de fechas exactas confirmadas.
 * Reemplazar por rangos reales cuando estén disponibles — ver PROJECT_STATUS.md.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "formacion",
    period: { es: "Formación en curso", en: "Degree in progress" },
    title: {
      es: "Ingeniería de Sistemas e Informática",
      en: "Systems and Computer Engineering",
    },
    organization: {
      es: "Universidad Pontificia Bolivariana · Bucaramanga",
      en: "Universidad Pontificia Bolivariana · Bucaramanga",
    },
    description: {
      es: "Formación en desarrollo de software, arquitectura, bases de datos, sistemas distribuidos y análisis de información. Próximo a culminar el programa.",
      en: "Training in software development, architecture, databases, distributed systems and information analysis. Close to completing the program.",
    },
    tags: ["Arquitectura", "Bases de datos", "Sistemas distribuidos"],
    ongoing: true,
  },
  {
    id: "academicos",
    period: { es: "Proyectos académicos", en: "Academic projects" },
    title: {
      es: "Desarrollo de proyectos en equipo",
      en: "Team project development",
    },
    description: {
      es: "Construcción de aplicaciones completas en contextos académicos, incluyendo el videojuego Hitdash y el simulador hidráulico de pozos, con reparto de responsabilidades y entregas acotadas en el tiempo.",
      en: "Building complete applications in academic contexts, including the Hitdash game and the hydraulic well simulator, with distributed responsibilities and time-boxed deliverables.",
    },
    tags: ["Trabajo en equipo", "Hitdash", "Simulación"],
  },
  {
    id: "analitica",
    period: { es: "Experiencia profesional", en: "Professional experience" },
    title: {
      es: "Analítica en plataforma de entrenamiento comercial con IA",
      en: "Analytics on an AI sales-training platform",
    },
    description: {
      es: "Diseño de la capa analítica de un producto SaaS: evaluación de interacciones, verificación con evidencia, métricas por vendedor y equipo, y dashboards diferenciados por rol.",
      en: "Design of the analytics layer of a SaaS product: interaction evaluation, evidence-backed verification, per-seller and per-team metrics, and role-differentiated dashboards.",
    },
    tags: ["SaaS", "Analítica", "Modelos de lenguaje"],
  },
  {
    id: "documental",
    period: { es: "Experiencia profesional", en: "Professional experience" },
    title: {
      es: "Sistemas documentales y dashboards",
      en: "Document systems and dashboards",
    },
    description: {
      es: "Arquitectura y construcción de una plataforma de vigilancia tecnológica y regulatoria: pipeline por estados, integración con modelos de lenguaje, Read Model y dashboards analíticos.",
      en: "Architecture and construction of a technology and regulatory watch platform: state-based pipeline, language model integration, read model and analytical dashboards.",
    },
    tags: ["Python", "PostgreSQL", "Streamlit", "Gemini"],
  },
  {
    id: "vialai",
    period: { es: "Proyecto continuo", en: "Ongoing project" },
    title: { es: "VialAI", en: "VialAI" },
    description: {
      es: "Construcción de una plataforma SaaS de detección y gestión de daños viales: entrenamiento de modelos de segmentación de instancias, arquitectura multi-tenant, roles y dashboards.",
      en: "Building a SaaS platform for road damage detection and management: instance segmentation model training, multi-tenant architecture, roles and dashboards.",
    },
    tags: ["Visión por computador", "Mask R-CNN", "SaaS"],
    ongoing: true,
  },
  {
    id: "freelance",
    period: { es: "Proyectos freelance", en: "Freelance projects" },
    title: {
      es: "Presencia digital para negocios",
      en: "Digital presence for businesses",
    },
    description: {
      es: "Diseño, desarrollo y despliegue de presentaciones digitales accesibles por QR para Vía Paulette y Forza Special Welding LLC, entregando código y recursos al cliente.",
      en: "Design, development and deployment of QR-accessible digital presentations for Vía Paulette and Forza Special Welding LLC, handing over code and assets to the client.",
    },
    tags: ["Cloudflare Pages", "UI/UX", "Freelance"],
  },
  {
    id: "practicas",
    period: { es: "Siguiente paso", en: "Next step" },
    title: {
      es: "Preparación para prácticas profesionales",
      en: "Preparing for a professional internship",
    },
    description: {
      es: "Disponible para prácticas profesionales y proyectos en software, inteligencia artificial, analítica y desarrollo web.",
      en: "Available for professional internships and projects in software, artificial intelligence, analytics and web development.",
    },
    tags: ["Disponible"],
    ongoing: true,
  },
];
