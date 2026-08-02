import type { Locale } from "@/types/content";

/**
 * UI copy (chrome, labels, section headers).
 *
 * Long-form professional content lives in `src/content/*`. This file only holds
 * strings belonging to the interface itself.
 */
export const dictionary = {
  es: {
    common: {
      skipToContent: "Saltar al contenido principal",
      loading: "Cargando",
      close: "Cerrar",
      menu: "Menú",
      openMenu: "Abrir menú de navegación",
      closeMenu: "Cerrar menú de navegación",
      language: "Idioma",
      changeLanguage: "Cambiar idioma",
      backToTop: "Volver arriba",
      scroll: "Desplázate",
    },
    nav: {
      home: "Inicio",
      about: "Perfil",
      projects: "Proyectos",
      experience: "Experiencia",
      skills: "Tecnologías",
      lab: "Laboratorio",
      contact: "Contacto",
      allProjects: "Todos los proyectos",
    },
    preloader: {
      boot: "Inicializando sistema",
      tagline: "Building intelligent systems",
      skip: "Omitir introducción",
    },
    hero: {
      exploreProjects: "Explorar proyectos",
      viewProfile: "Conocer mi perfil",
      downloadCv: "Descargar CV",
      scrollHint: "Explorar trabajo",
      sceneLabel: "Composición tridimensional abstracta que representa la unión entre software, datos e inteligencia artificial.",
    },
    about: {
      eyebrow: "Perfil",
      title: "Sistemas completos, no piezas sueltas",
      educationLabel: "Formación",
    },
    showreel: {
      eyebrow: "Showreel",
      title: "De la carretera al modelo, del documento al dashboard",
      description:
        "Cuatro dominios distintos, un mismo recorrido: capturar el problema, estructurarlo y devolverlo como algo que se puede leer y decidir.",
      steps: {
        road: {
          title: "Detección en vía",
          description: "Una imagen de asfalto se convierte en un daño delimitado y georreferenciado.",
        },
        pipeline: {
          title: "Pipeline documental",
          description: "Documentos heterogéneos avanzan por etapas hasta volverse comparables.",
        },
        dashboard: {
          title: "Capa analítica",
          description: "Los datos preparados se agregan en indicadores por rol.",
        },
        terminal: {
          title: "Entorno propio",
          description: "Modelos y herramientas ejecutándose en hardware local.",
        },
      },
    },
    projects: {
      eyebrow: "Trabajo seleccionado",
      title: "Proyectos",
      description:
        "Seis proyectos donde el software, los modelos y los datos resuelven un problema concreto.",
      viewCase: "Ver caso",
      viewAll: "Ver todos los proyectos",
      featured: "Proyecto destacado",
      confidential: "Caso confidencial",
      confidentialNote:
        "Caso presentado con información limitada por confidencialidad.",
      inProgress: "En desarrollo",
      completed: "Finalizado",
      ownProject: "Proyecto propio",
      collaboration: "Participación profesional",
      problem: "Problema",
      solution: "Solución",
      contribution: "Mi aporte",
      technologies: "Tecnologías",
      role: "Rol",
      category: "Categoría",
      filterAll: "Todos",
      filterLabel: "Filtrar proyectos por categoría",
      empty: "No hay proyectos en esta categoría.",
      demo: "Ver demo",
      repository: "Repositorio",
      linksPending: "Enlaces públicos pendientes de publicación.",
    },
    caseStudy: {
      backToProjects: "Volver a proyectos",
      context: "Contexto",
      objectives: "Objetivos",
      contribution: "Mi participación",
      architecture: "Arquitectura",
      process: "Proceso",
      decisions: "Decisiones",
      challenges: "Desafíos",
      results: "Resultados",
      learnings: "Aprendizajes",
      metrics: "Métricas de evaluación",
      gallery: "Representación visual",
      galleryNote:
        "Visualización generada con código a partir del concepto del proyecto. Las capturas reales se añadirán cuando estén disponibles.",
      nextProject: "Proyecto siguiente",
      overview: "Resumen",
    },
    experience: {
      eyebrow: "Trayectoria",
      title: "Formación, proyectos y experiencia",
      description:
        "Los periodos se expresan de forma relativa: solo se publican fechas confirmadas.",
      ongoing: "En curso",
    },
    skills: {
      eyebrow: "Tecnologías",
      title: "Áreas de trabajo",
      description:
        "Sin barras de porcentaje: cada área está respaldada por los proyectos de esta página.",
    },
    lab: {
      eyebrow: "Technology Lab",
      title: "Exploración activa",
      description:
        "Herramientas, técnicas y áreas en las que estoy trabajando actualmente.",
      status: {
        exploring: "Explorando",
        active: "Activo",
        shipped: "En producción",
      },
    },
    contact: {
      eyebrow: "Contacto",
      title: "Construyamos algo que realmente funcione.",
      description:
        "Estoy abierto a oportunidades profesionales, prácticas, proyectos de software, inteligencia artificial, analítica y desarrollo web.",
      email: "Escribir correo",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
      cv: "Descargar CV",
      pending:
        "Los canales de contacto se activarán en cuanto se configuren los enlaces correspondientes.",
    },
    footer: {
      credit: "Diseñado y desarrollado por Santos Enmanuel.",
      built:
        "Construido con React, TypeScript, animación web y mucha atención a los detalles.",
      rights: "Todos los derechos reservados.",
    },
    motion: {
      toggleLabel: "Efectos visuales",
      enable: "Activar efectos visuales",
      disable: "Desactivar efectos visuales",
      reducedNotice: "Efectos reducidos activos",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La ruta solicitada no existe o fue movida.",
      action: "Volver al inicio",
    },
  },

  en: {
    common: {
      skipToContent: "Skip to main content",
      loading: "Loading",
      close: "Close",
      menu: "Menu",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      language: "Language",
      changeLanguage: "Change language",
      backToTop: "Back to top",
      scroll: "Scroll",
    },
    nav: {
      home: "Home",
      about: "Profile",
      projects: "Projects",
      experience: "Experience",
      skills: "Technologies",
      lab: "Lab",
      contact: "Contact",
      allProjects: "All projects",
    },
    preloader: {
      boot: "Initializing system",
      tagline: "Building intelligent systems",
      skip: "Skip intro",
    },
    hero: {
      exploreProjects: "Explore projects",
      viewProfile: "View my profile",
      downloadCv: "Download CV",
      scrollHint: "Explore work",
      sceneLabel: "Abstract three-dimensional composition representing the union of software, data and artificial intelligence.",
    },
    about: {
      eyebrow: "Profile",
      title: "Complete systems, not loose parts",
      educationLabel: "Education",
    },
    showreel: {
      eyebrow: "Showreel",
      title: "From road to model, from document to dashboard",
      description:
        "Four different domains, one same path: capture the problem, structure it and return it as something you can read and decide on.",
      steps: {
        road: {
          title: "Road detection",
          description: "An asphalt image becomes a delineated, geo-referenced defect.",
        },
        pipeline: {
          title: "Document pipeline",
          description: "Heterogeneous documents move through stages until they become comparable.",
        },
        dashboard: {
          title: "Analytics layer",
          description: "Prepared data aggregates into role-specific indicators.",
        },
        terminal: {
          title: "Own environment",
          description: "Models and tools running on local hardware.",
        },
      },
    },
    projects: {
      eyebrow: "Selected work",
      title: "Projects",
      description:
        "Six projects where software, models and data solve a concrete problem.",
      viewCase: "View case",
      viewAll: "View all projects",
      featured: "Featured project",
      confidential: "Confidential case",
      confidentialNote: "Case presented with limited information due to confidentiality.",
      inProgress: "In progress",
      completed: "Completed",
      ownProject: "Own project",
      collaboration: "Professional contribution",
      problem: "Problem",
      solution: "Solution",
      contribution: "My contribution",
      technologies: "Technologies",
      role: "Role",
      category: "Category",
      filterAll: "All",
      filterLabel: "Filter projects by category",
      empty: "No projects in this category.",
      demo: "View demo",
      repository: "Repository",
      linksPending: "Public links pending publication.",
    },
    caseStudy: {
      backToProjects: "Back to projects",
      context: "Context",
      objectives: "Objectives",
      contribution: "My participation",
      architecture: "Architecture",
      process: "Process",
      decisions: "Decisions",
      challenges: "Challenges",
      results: "Results",
      learnings: "Learnings",
      metrics: "Evaluation metrics",
      gallery: "Visual representation",
      galleryNote:
        "Visualization generated with code from the project concept. Real screenshots will be added when available.",
      nextProject: "Next project",
      overview: "Overview",
    },
    experience: {
      eyebrow: "Timeline",
      title: "Education, projects and experience",
      description: "Periods are stated relatively: only confirmed dates are published.",
      ongoing: "Ongoing",
    },
    skills: {
      eyebrow: "Technologies",
      title: "Areas of work",
      description:
        "No percentage bars: every area is backed by the projects on this page.",
    },
    lab: {
      eyebrow: "Technology Lab",
      title: "Active exploration",
      description: "Tools, techniques and areas I am currently working on.",
      status: {
        exploring: "Exploring",
        active: "Active",
        shipped: "Shipped",
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something that actually works.",
      description:
        "I am open to professional opportunities, internships, software, artificial intelligence, analytics and web development projects.",
      email: "Send an email",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
      cv: "Download CV",
      pending: "Contact channels will appear as soon as the corresponding links are configured.",
    },
    footer: {
      credit: "Designed and developed by Santos Enmanuel.",
      built: "Built with React, TypeScript, web animation and a lot of attention to detail.",
      rights: "All rights reserved.",
    },
    motion: {
      toggleLabel: "Visual effects",
      enable: "Enable visual effects",
      disable: "Disable visual effects",
      reducedNotice: "Reduced effects active",
    },
    notFound: {
      title: "Page not found",
      description: "The requested route does not exist or was moved.",
      action: "Back to home",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
