import type { LabEntry } from "@/types/content";

/** Áreas de exploración activa mostradas en la sección Technology Lab. */
export const labEntries: LabEntry[] = [
  {
    id: "local-models",
    command: "ollama run qwen-coder",
    title: { es: "Modelos locales", en: "Local models" },
    description: {
      es: "Ejecución de modelos de lenguaje en hardware propio, ajustando contexto y midiendo consumo de GPU frente a la alternativa en la nube.",
      en: "Running language models on own hardware, tuning context and measuring GPU usage against the cloud alternative.",
    },
    status: "active",
    tags: ["Ollama", "Qwen Coder", "GPU"],
  },
  {
    id: "computer-vision",
    command: "train --arch maskrcnn --backbone mobilenetv3",
    title: { es: "Visión por computador", en: "Computer vision" },
    description: {
      es: "Segmentación de instancias sobre superficies reales, con métricas separadas para contorno, cobertura y detección por componente.",
      en: "Instance segmentation over real surfaces, with separate metrics for contour, coverage and per-component detection.",
    },
    status: "active",
    tags: ["PyTorch", "Segmentación", "Métricas"],
  },
  {
    id: "web-3d",
    command: "render --scene hero --dpr adaptive",
    title: { es: "Interfaces 3D", en: "3D interfaces" },
    description: {
      es: "Escenas WebGL con calidad adaptativa, instancing y fallback estático — como la que se está ejecutando en este portafolio.",
      en: "WebGL scenes with adaptive quality, instancing and static fallback — like the one running in this portfolio.",
    },
    status: "shipped",
    tags: ["Three.js", "React Three Fiber", "WebGL"],
  },
  {
    id: "architecture",
    command: "design --pattern read-model --split write/read",
    title: { es: "Arquitectura", en: "Architecture" },
    description: {
      es: "Separación entre escritura y lectura, pipelines por estados persistidos y monolitos modulares como alternativa razonable a los microservicios.",
      en: "Write/read separation, persisted state pipelines and modular monoliths as a reasonable alternative to microservices.",
    },
    status: "active",
    tags: ["Read Model", "Pipelines", "Modularidad"],
  },
  {
    id: "documents",
    command: "pipeline --ingest pdf,xlsx --normalize",
    title: { es: "Procesamiento documental", en: "Document processing" },
    description: {
      es: "Normalización de documentos heterogéneos hacia una estructura comparable, con preparación para embeddings y recuperación semántica.",
      en: "Normalizing heterogeneous documents into a comparable structure, prepared for embeddings and semantic retrieval.",
    },
    status: "active",
    tags: ["Python", "Gemini", "RAG"],
  },
  {
    id: "performance",
    command: "audit --vitals --bundle",
    title: { es: "Optimización", en: "Optimization" },
    description: {
      es: "Core Web Vitals, peso del bundle, carga diferida y calidad adaptativa según las capacidades del dispositivo.",
      en: "Core Web Vitals, bundle weight, lazy loading and adaptive quality based on device capability.",
    },
    status: "shipped",
    tags: ["Core Web Vitals", "Lazy loading", "DPR"],
  },
  {
    id: "games",
    command: "spawn --enemies wave:progressive",
    title: { es: "Desarrollo de videojuegos", en: "Game development" },
    description: {
      es: "Diseño de curvas de dificultad, animación por sprites y perspectivas que aportan profundidad sin costo de motor 3D.",
      en: "Difficulty curve design, sprite animation and perspectives that add depth without 3D engine cost.",
    },
    status: "shipped",
    tags: ["Pixel art", "Game design"],
  },
  {
    id: "automation",
    command: "orchestrate --resume-from-state",
    title: { es: "Automatización", en: "Automation" },
    description: {
      es: "Orquestación de procesos largos que pueden reanudarse desde el punto exacto de fallo sin repetir el trabajo previo.",
      en: "Orchestrating long processes that resume from the exact failure point without repeating prior work.",
    },
    status: "exploring",
    tags: ["Estados", "Reanudación", "Orquestación"],
  },
];
