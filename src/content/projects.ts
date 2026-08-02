import type { L, Project, ProjectCategoryId } from "@/types/content";

export const projectCategories: { id: ProjectCategoryId; label: L<string> }[] = [
  { id: "ai", label: { es: "Inteligencia artificial", en: "Artificial intelligence" } },
  { id: "computer-vision", label: { es: "Visión por computador", en: "Computer vision" } },
  { id: "data", label: { es: "Datos y analítica", en: "Data & analytics" } },
  { id: "web", label: { es: "Desarrollo web", en: "Web development" } },
  { id: "architecture", label: { es: "Arquitectura de software", en: "Software architecture" } },
  { id: "game", label: { es: "Videojuegos", en: "Games" } },
];

export const projects: Project[] = [
  // ───────────────────────────────────────────────────────────── 01 · VialAI
  {
    slug: "vialai",
    index: "01",
    name: "VialAI",
    accent: "detection",
    visual: "road-scan",
    featured: true,
    category: ["ai", "computer-vision", "architecture"],
    role: {
      es: "Desarrollo de plataforma y modelos de visión",
      en: "Platform development and vision models",
    },
    technologies: [
      "Python",
      "PyTorch",
      "Mask R-CNN",
      "MobileNetV3-FPN",
      "PostgreSQL",
      "Supabase",
      "React",
      "TypeScript",
      "Kaggle GPU",
    ],
    summary: {
      es: "Plataforma SaaS que detecta y gestiona daños viales con visión por computador, desde la captura hasta la orden de trabajo.",
      en: "SaaS platform that detects and manages road damage with computer vision, from capture to work order.",
    },
    description: {
      es: "VialAI es una plataforma SaaS orientada a alcaldías, concesiones viales y organizaciones encargadas del mantenimiento de vías. Permite detectar y gestionar baches o daños viales mediante inteligencia artificial y visión por computador, cerrando el ciclo completo entre la evidencia en campo y la gestión del mantenimiento.",
      en: "VialAI is a SaaS platform for municipalities, road concessions and organizations responsible for road maintenance. It detects and manages potholes and road damage using artificial intelligence and computer vision, closing the full loop between field evidence and maintenance management.",
    },
    problem: {
      es: "La inspección vial suele depender de recorridos manuales y reportes dispersos. La evidencia se pierde entre fotografías sueltas, hojas de cálculo y mensajes, y no existe una trazabilidad clara entre el daño detectado, su ubicación y la intervención que finalmente se ejecuta.",
      en: "Road inspection usually depends on manual surveys and scattered reports. Evidence gets lost among loose photos, spreadsheets and messages, and there is no clear traceability between the detected damage, its location and the intervention that is finally carried out.",
    },
    solution: {
      es: "Una plataforma multi-tenant donde la imagen capturada en campo se procesa con un modelo de segmentación de instancias, se valida por un operador humano y se convierte en una incidencia georreferenciada con evidencias, estado y orden de trabajo asociada. Los dashboards agregan esa información por organización, zona y periodo.",
      en: "A multi-tenant platform where field imagery is processed by an instance segmentation model, validated by a human operator, and turned into a geo-referenced incident with evidence, status and an associated work order. Dashboards aggregate that information per organization, zone and period.",
    },
    contribution: {
      es: [
        "Entrenamiento de modelos de segmentación de instancias con arquitectura Mask R-CNN sobre backbone MobileNetV3-FPN.",
        "Transferencia de pesos y ajuste de la función de pérdida para el dominio de daños viales.",
        "Evaluación con métricas de Dice, Pixel Recall y Component F1, además del manejo explícito de muestras negativas.",
        "Diseño del modelo de datos multi-tenant con separación estricta de información por organización.",
        "Definición del sistema de roles: superadministrador, administrador, operador y visualizador.",
        "Flujo de validación humana sobre las predicciones antes de generar la incidencia.",
        "Construcción de dashboards, reportes y visualización cartográfica de incidencias.",
      ],
      en: [
        "Trained instance segmentation models with a Mask R-CNN architecture on a MobileNetV3-FPN backbone.",
        "Weight transfer and loss function tuning for the road damage domain.",
        "Evaluation with Dice, Pixel Recall and Component F1 metrics, plus explicit negative sample handling.",
        "Designed the multi-tenant data model with strict per-organization data isolation.",
        "Defined the role system: super admin, admin, operator and viewer.",
        "Human validation flow over predictions before an incident is created.",
        "Built dashboards, reports and map-based incident visualization.",
      ],
    },
    caseStudy: {
      context: {
        es: "El mantenimiento vial es un problema de priorización: los recursos son limitados y la información sobre el estado real de la malla vial suele estar incompleta o desactualizada. VialAI nace para que la evidencia visual se convierta en información estructurada y accionable.",
        en: "Road maintenance is a prioritization problem: resources are limited and information about the real state of the road network is usually incomplete or outdated. VialAI exists so visual evidence becomes structured, actionable information.",
      },
      objectives: {
        es: [
          "Detectar y delimitar daños viales a partir de imágenes capturadas en campo.",
          "Mantener a una persona en el ciclo de decisión para validar cada detección.",
          "Trazar el recorrido completo desde la evidencia hasta la orden de trabajo.",
          "Aislar la información de cada organización dentro de la misma plataforma.",
          "Entregar dashboards útiles para perfiles técnicos y directivos.",
        ],
        en: [
          "Detect and delineate road damage from field-captured imagery.",
          "Keep a human in the decision loop to validate every detection.",
          "Trace the full path from evidence to work order.",
          "Isolate each organization's information inside the same platform.",
          "Deliver dashboards useful to both technical and executive profiles.",
        ],
      },
      architecture: {
        title: { es: "Arquitectura", en: "Architecture" },
        body: {
          es: [
            "Capa de captura: ingesta de imágenes desde campo con metadatos de ubicación y momento de registro.",
            "Capa de inferencia: modelo de segmentación de instancias que devuelve máscaras y puntuaciones por daño detectado.",
            "Capa de validación: interfaz donde un operador acepta, corrige o descarta cada predicción antes de que se convierta en dato oficial.",
            "Capa de gestión: incidencias, órdenes de trabajo, evidencias asociadas y estados de avance.",
            "Capa analítica: agregaciones por organización, zona y periodo que alimentan dashboards y reportes.",
            "Aislamiento multi-tenant: cada organización solo accede a sus propios registros, con roles que definen qué operaciones puede ejecutar cada perfil.",
          ],
          en: [
            "Capture layer: field image ingestion with location and timestamp metadata.",
            "Inference layer: instance segmentation model returning masks and scores per detected damage.",
            "Validation layer: interface where an operator accepts, corrects or discards each prediction before it becomes official data.",
            "Management layer: incidents, work orders, attached evidence and progress states.",
            "Analytics layer: aggregations per organization, zone and period feeding dashboards and reports.",
            "Multi-tenant isolation: each organization only reaches its own records, with roles defining which operations each profile can run.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Preparación del conjunto de datos y revisión de la calidad de las anotaciones de segmentación.",
            "Entrenamiento en GPU partiendo de pesos preentrenados y adaptando las cabezas de clasificación y máscara.",
            "Ajuste de la composición de la pérdida para equilibrar la calidad de la máscara frente a la detección.",
            "Incorporación deliberada de muestras negativas: asfalto sano, sombras y manchas que un modelo ingenuo confunde con daños.",
            "Evaluación iterativa con Dice, Pixel Recall y Component F1 para separar la calidad del contorno de la capacidad de encontrar cada daño.",
            "Integración del modelo dentro del flujo de producto, con validación humana como paso obligatorio.",
          ],
          en: [
            "Dataset preparation and quality review of the segmentation annotations.",
            "GPU training starting from pretrained weights, adapting the classification and mask heads.",
            "Tuning the loss composition to balance mask quality against detection.",
            "Deliberate inclusion of negative samples: healthy asphalt, shadows and stains that a naive model mistakes for damage.",
            "Iterative evaluation with Dice, Pixel Recall and Component F1 to separate contour quality from the ability to find each defect.",
            "Model integration into the product flow, with human validation as a mandatory step.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones técnicas", en: "Technical decisions" },
        body: {
          es: [
            "Segmentación de instancias en lugar de simple detección con caja: el área y la forma del daño importan para estimar la intervención.",
            "Backbone MobileNetV3-FPN por su relación entre costo computacional y calidad, pensando en inferencia asequible.",
            "Tres métricas complementarias en vez de una sola: Dice describe la calidad del contorno, Pixel Recall la cobertura y Component F1 si se encontró cada daño como entidad separada.",
            "Validación humana obligatoria: el modelo propone, la persona decide. Evita que un falso positivo se convierta en una orden de trabajo.",
            "Separación por organización desde el modelo de datos, no como filtro añadido en la interfaz.",
          ],
          en: [
            "Instance segmentation instead of plain box detection: damage area and shape matter when estimating the intervention.",
            "MobileNetV3-FPN backbone for its balance between compute cost and quality, aiming at affordable inference.",
            "Three complementary metrics rather than one: Dice describes contour quality, Pixel Recall coverage, and Component F1 whether each defect was found as a separate entity.",
            "Mandatory human validation: the model proposes, the person decides. It prevents a false positive from becoming a work order.",
            "Per-organization separation modeled in the data layer, not bolted on as a UI filter.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Variabilidad del asfalto: sombras, humedad, parches previos y cambios de iluminación producen texturas que se parecen a un daño real.",
            "Desbalance del conjunto de datos: la mayoría de píxeles de una imagen vial corresponden a superficie sana.",
            "Fragmentación de máscaras: un mismo bache podía predecirse como varios componentes separados, lo que distorsiona el conteo.",
            "Equilibrar el costo de inferencia con la calidad de la segmentación para que la plataforma resulte viable en operación.",
          ],
          en: [
            "Asphalt variability: shadows, moisture, previous patches and lighting changes produce textures that look like real damage.",
            "Dataset imbalance: most pixels in a road image belong to healthy surface.",
            "Mask fragmentation: a single pothole could be predicted as several separate components, distorting counts.",
            "Balancing inference cost against segmentation quality so the platform stays viable in operation.",
          ],
        },
      },
      results: {
        es: [
          "Flujo funcional de extremo a extremo: captura, detección, validación humana, incidencia y orden de trabajo.",
          "Modelo de segmentación evaluado con un conjunto de métricas que distingue calidad de contorno, cobertura y detección por componente.",
          "Arquitectura multi-tenant con roles diferenciados y separación de información por organización.",
          "Dashboards y visualización cartográfica que convierten registros individuales en una lectura del estado de la red vial.",
        ],
        en: [
          "Functional end-to-end flow: capture, detection, human validation, incident and work order.",
          "Segmentation model evaluated with a metric set that separates contour quality, coverage and per-component detection.",
          "Multi-tenant architecture with differentiated roles and per-organization data isolation.",
          "Dashboards and map visualization turning individual records into a reading of the road network state.",
        ],
      },
      learnings: {
        es: [
          "Una sola métrica agregada esconde el comportamiento real de un modelo de segmentación.",
          "Las muestras negativas bien elegidas mejoran más que aumentar el volumen de ejemplos positivos.",
          "La validación humana no es una limitación del sistema: es lo que lo hace utilizable en un contexto donde cada orden de trabajo cuesta dinero.",
          "El aislamiento multi-tenant debe existir en el modelo de datos desde el primer día.",
        ],
        en: [
          "A single aggregate metric hides the real behavior of a segmentation model.",
          "Well-chosen negative samples help more than simply adding positive examples.",
          "Human validation is not a system limitation: it is what makes it usable where every work order costs money.",
          "Multi-tenant isolation must live in the data model from day one.",
        ],
      },
      metrics: [
        {
          label: { es: "Métrica de contorno", en: "Contour metric" },
          value: "Dice",
          note: {
            es: "Solapamiento entre la máscara predicha y la anotada.",
            en: "Overlap between the predicted and annotated mask.",
          },
        },
        {
          label: { es: "Cobertura", en: "Coverage" },
          value: "Pixel Recall",
          note: {
            es: "Proporción del daño real que el modelo alcanza a cubrir.",
            en: "Share of real damage the model manages to cover.",
          },
        },
        {
          label: { es: "Detección por componente", en: "Per-component detection" },
          value: "Component F1",
          note: {
            es: "Evalúa cada daño como entidad separada, no como píxeles sueltos.",
            en: "Evaluates each defect as a separate entity, not as loose pixels.",
          },
        },
      ],
    },
  },

  // ────────────────────────────────────── 02 · Vigilancia tecnológica
  {
    slug: "vigilancia-tecnologica",
    index: "02",
    name: "Plataforma de vigilancia tecnológica y regulatoria",
    accent: "intelligence",
    visual: "document-pipeline",
    featured: true,
    category: ["ai", "data", "architecture"],
    role: {
      es: "Arquitectura, pipeline de procesamiento y dashboard",
      en: "Architecture, processing pipeline and dashboard",
    },
    technologies: [
      "Python",
      "PostgreSQL",
      "Supabase Storage",
      "Gemini",
      "Streamlit",
      "SQL",
      "RPC",
    ],
    summary: {
      es: "Pipeline documental que convierte PDF y Excel dispersos en un modelo de lectura analítico con dashboards de tendencias.",
      en: "Document pipeline turning scattered PDFs and spreadsheets into an analytical read model with trend dashboards.",
    },
    description: {
      es: "Plataforma para automatizar la carga, procesamiento, análisis y visualización de documentos relacionados con vigilancia tecnológica y regulatoria. El sistema recibe documentos heterogéneos y los convierte en información consultable, comparable y visualizable.",
      en: "Platform automating the upload, processing, analysis and visualization of technology and regulatory watch documents. The system takes heterogeneous documents and turns them into queryable, comparable and visualizable information.",
    },
    problem: {
      es: "La vigilancia tecnológica y regulatoria genera un flujo constante de documentos en formatos distintos. Revisarlos manualmente no escala, y sin una estructura común es imposible comparar fuentes, detectar tendencias o responder preguntas transversales sobre el conjunto.",
      en: "Technology and regulatory watch generates a constant flow of documents in different formats. Reviewing them manually does not scale, and without a common structure it is impossible to compare sources, spot trends or answer cross-cutting questions about the corpus.",
    },
    solution: {
      es: "Un monolito modular en Python que procesa cada documento por etapas explícitas, persiste el estado de cada una y separa el procesamiento de la consulta. El resultado se publica mediante RPC hacia un Read Model, y un dashboard en Streamlit lee exclusivamente de esa capa preparada.",
      en: "A modular Python monolith that processes each document through explicit stages, persists the state of each one and separates processing from querying. Results are published via RPC into a read model, and a Streamlit dashboard reads exclusively from that prepared layer.",
    },
    contribution: {
      es: [
        "Diseño del pipeline por estados, con persistencia del avance de cada documento.",
        "Integración de carga de PDF y Excel con almacenamiento en Supabase Storage y metadatos en PostgreSQL.",
        "Orquestación de los procesos de extracción y análisis automatizado con Gemini.",
        "Publicación de resultados mediante RPC hacia un Read Model separado del modelo de escritura.",
        "Generación de snapshots de información para consultas reproducibles.",
        "Construcción del dashboard en Streamlit: alineación documental, rankings, tendencias y visualizaciones interactivas.",
        "Preparación de los componentes para incorporar RAG, embeddings y recuperación semántica.",
      ],
      en: [
        "Designed the state-based pipeline, persisting each document's progress.",
        "Integrated PDF and Excel ingestion with Supabase Storage and metadata in PostgreSQL.",
        "Orchestrated extraction and automated analysis processes with Gemini.",
        "Published results via RPC into a read model separated from the write model.",
        "Generated information snapshots for reproducible queries.",
        "Built the Streamlit dashboard: document alignment, rankings, trends and interactive visualizations.",
        "Prepared the components to incorporate RAG, embeddings and semantic retrieval.",
      ],
    },
    caseStudy: {
      context: {
        es: "La vigilancia tecnológica y regulatoria consiste en seguir de cerca lo que ocurre en un dominio: normativa, publicaciones, actores y tendencias. El insumo son documentos; el producto esperado es criterio para decidir.",
        en: "Technology and regulatory watch means closely following what happens in a domain: regulation, publications, actors and trends. The input is documents; the expected output is judgment to decide.",
      },
      objectives: {
        es: [
          "Automatizar la ingesta de documentos en formatos heterogéneos.",
          "Estructurar el contenido para hacerlo comparable entre fuentes.",
          "Hacer reproducible y auditable cada etapa del procesamiento.",
          "Separar el costo del análisis del costo de la consulta.",
          "Entregar visualizaciones que respondan preguntas concretas.",
        ],
        en: [
          "Automate ingestion of documents in heterogeneous formats.",
          "Structure content to make it comparable across sources.",
          "Make every processing stage reproducible and auditable.",
          "Separate the cost of analysis from the cost of querying.",
          "Deliver visualizations that answer concrete questions.",
        ],
      },
      architecture: {
        title: { es: "Arquitectura", en: "Architecture" },
        body: {
          es: [
            "Monolito modular en Python: módulos con responsabilidades separadas dentro de un único despliegue, evitando la complejidad operativa de microservicios sin necesidad real.",
            "Almacenamiento binario en Supabase Storage; metadatos, estados y resultados estructurados en PostgreSQL.",
            "Pipeline por estados: cada documento avanza por etapas explícitas y su posición queda persistida, de modo que un fallo se reanuda desde el punto exacto.",
            "Integración con Gemini para el análisis automatizado del contenido extraído.",
            "Publicación mediante RPC hacia un Read Model: la capa de consulta nunca ejecuta el procesamiento pesado.",
            "Snapshots que congelan el estado de la información para que un dashboard sea reproducible.",
            "Dashboard en Streamlit como capa de presentación desacoplada.",
          ],
          en: [
            "Modular Python monolith: modules with separated responsibilities inside a single deployment, avoiding microservice operational complexity without real need.",
            "Binary storage in Supabase Storage; metadata, states and structured results in PostgreSQL.",
            "State-based pipeline: each document advances through explicit stages and its position is persisted, so a failure resumes from the exact point.",
            "Gemini integration for automated analysis of the extracted content.",
            "RPC publication into a read model: the query layer never runs the heavy processing.",
            "Snapshots freezing the information state so a dashboard stays reproducible.",
            "Streamlit dashboard as a decoupled presentation layer.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Carga del documento y registro de su metadato inicial.",
            "Extracción del contenido según el formato de origen: PDF o Excel.",
            "Normalización hacia una estructura común independiente del formato.",
            "Análisis automatizado del contenido normalizado.",
            "Publicación del resultado mediante RPC hacia el Read Model.",
            "Consulta y visualización desde el dashboard, sin tocar el pipeline.",
          ],
          en: [
            "Document upload and initial metadata registration.",
            "Content extraction according to the source format: PDF or Excel.",
            "Normalization into a common structure independent of format.",
            "Automated analysis of the normalized content.",
            "Result publication via RPC into the read model.",
            "Querying and visualization from the dashboard, without touching the pipeline.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones técnicas", en: "Technical decisions" },
        body: {
          es: [
            "Monolito modular en lugar de microservicios: la complejidad del dominio estaba en el procesamiento, no en la escala de despliegue.",
            "Pipeline por estados persistidos: permite reanudar, auditar y reprocesar sin repetir todo el trabajo.",
            "Separación entre modelo de escritura y Read Model: el dashboard responde rápido porque consulta datos ya preparados.",
            "Snapshots para reproducibilidad: un mismo reporte consultado dos veces debe poder dar el mismo resultado.",
            "Componentes preparados para RAG y embeddings, sin introducir esa complejidad antes de que el caso de uso la justifique.",
          ],
          en: [
            "Modular monolith instead of microservices: domain complexity lived in the processing, not in deployment scale.",
            "Persisted state pipeline: allows resuming, auditing and reprocessing without repeating all the work.",
            "Write model / read model separation: the dashboard answers fast because it queries already-prepared data.",
            "Snapshots for reproducibility: the same report queried twice should be able to return the same result.",
            "Components prepared for RAG and embeddings, without introducing that complexity before the use case justifies it.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Heterogeneidad real de los PDF: estructura, calidad y convenciones cambian entre fuentes.",
            "Definir una estructura común lo bastante estricta para comparar y lo bastante flexible para admitir documentos nuevos.",
            "Manejo de fallos parciales en un pipeline largo sin perder el trabajo ya realizado.",
            "Evitar que el dashboard cargara procesamiento pesado en tiempo de consulta.",
          ],
          en: [
            "Real PDF heterogeneity: structure, quality and conventions change between sources.",
            "Defining a common structure strict enough to compare and flexible enough to admit new documents.",
            "Handling partial failures in a long pipeline without losing already-completed work.",
            "Preventing the dashboard from carrying heavy processing at query time.",
          ],
        },
      },
      results: {
        es: [
          "Ingesta automatizada de documentos que antes se revisaban uno por uno.",
          "Estado de procesamiento visible y reanudable para cada documento.",
          "Capa de consulta desacoplada que sostiene dashboards interactivos.",
          "Visualizaciones de alineación documental, rankings y tendencias sobre el conjunto completo.",
        ],
        en: [
          "Automated ingestion of documents previously reviewed one by one.",
          "Visible, resumable processing state for every document.",
          "Decoupled query layer supporting interactive dashboards.",
          "Document alignment, ranking and trend visualizations over the whole corpus.",
        ],
      },
      learnings: {
        es: [
          "Un pipeline con estados explícitos es mucho más fácil de operar que uno que solo devuelve éxito o error.",
          "Separar escritura y lectura resuelve problemas de rendimiento antes de que aparezcan.",
          "El valor de un sistema documental no está en extraer texto, sino en hacerlo comparable.",
          "Preparar la arquitectura para RAG sin implementarlo todavía mantiene abierta la opción sin pagar su costo.",
        ],
        en: [
          "A pipeline with explicit states is far easier to operate than one that only returns success or error.",
          "Separating writes from reads solves performance problems before they appear.",
          "The value of a document system is not extracting text, but making it comparable.",
          "Preparing the architecture for RAG without implementing it yet keeps the option open without paying its cost.",
        ],
      },
    },
  },

  // ─────────────────────────── 03 · Analítica entrenamiento de ventas
  {
    slug: "analitica-entrenamiento-ventas",
    index: "03",
    name: "Analítica para plataforma de entrenamiento de ventas",
    accent: "analytics",
    visual: "signal-board",
    featured: true,
    confidential: true,
    category: ["ai", "data"],
    role: {
      es: "Analítica de producto y dashboards por rol",
      en: "Product analytics and role-aware dashboards",
    },
    technologies: [
      "Python",
      "SQL",
      "PostgreSQL",
      "Modelos de lenguaje",
      "Dashboards",
      "Evaluación automatizada",
    ],
    summary: {
      es: "Capa analítica que convierte conversaciones de entrenamiento comercial con IA en señales accionables por rol.",
      en: "Analytics layer turning AI sales-training conversations into role-specific actionable signals.",
    },
    description: {
      es: "Trabajo realizado en una plataforma de simulación y entrenamiento comercial con inteligencia artificial. El foco estuvo en la capa analítica: convertir el registro de conversaciones y sesiones de entrenamiento en métricas comprensibles para vendedores, managers y administradores.",
      en: "Work carried out on an AI-powered sales simulation and training platform. The focus was the analytics layer: turning the record of conversations and training sessions into metrics that make sense to sellers, managers and administrators.",
    },
    problem: {
      es: "Una sesión de entrenamiento conversacional genera una cantidad enorme de información poco estructurada. Sin una capa analítica, ese material no responde las preguntas que cada perfil necesita: qué mejorar, a quién acompañar y cómo evoluciona el equipo.",
      en: "A conversational training session generates a large amount of loosely structured information. Without an analytics layer, that material does not answer the questions each profile needs: what to improve, who to coach and how the team is progressing.",
    },
    solution: {
      es: "Un sistema de evaluación que analiza cada interacción, verifica afirmaciones contra evidencia de la conversación, califica el cumplimiento de tareas y escenarios, y agrega los resultados en métricas por vendedor, por equipo y a nivel empresarial, con dashboards diferenciados según el rol de quien consulta.",
      en: "An evaluation system that analyzes each interaction, verifies claims against conversation evidence, scores task and scenario completion, and aggregates results into per-seller, per-team and company-level metrics, with dashboards differentiated by the viewer's role.",
    },
    contribution: {
      es: [
        "Diseño de la evaluación de interacciones y del análisis de desempeño por sesión.",
        "Verificación de afirmaciones contra la evidencia registrada en la conversación.",
        "Evaluación del cumplimiento de tareas y escenarios de entrenamiento.",
        "Generación de retroalimentación automatizada orientada a la mejora concreta.",
        "Definición de métricas por vendedor, por equipo y a nivel empresarial.",
        "Dashboards diferenciados por rol, con indicadores de salud de oportunidades y coaching.",
        "Seguimiento del rendimiento por módulo y de la evolución durante el onboarding.",
      ],
      en: [
        "Designed interaction evaluation and per-session performance analysis.",
        "Claim verification against the evidence recorded in the conversation.",
        "Assessment of training task and scenario completion.",
        "Automated feedback generation oriented toward concrete improvement.",
        "Defined per-seller, per-team and company-level metrics.",
        "Role-differentiated dashboards, with opportunity health and coaching indicators.",
        "Per-module performance tracking and onboarding progression.",
      ],
    },
    caseStudy: {
      context: {
        es: "El entrenamiento comercial asistido por IA permite practicar conversaciones difíciles sin riesgo real. El reto no es generar la simulación, sino medirla: entender qué ocurrió en cada sesión y traducirlo en algo que la persona pueda accionar.",
        en: "AI-assisted sales training allows practicing difficult conversations without real risk. The challenge is not generating the simulation but measuring it: understanding what happened in each session and translating it into something the person can act on.",
      },
      objectives: {
        es: [
          "Convertir conversaciones extensas en indicadores comprensibles.",
          "Sustentar cada evaluación con evidencia de la propia conversación.",
          "Diferenciar la lectura según el rol: vendedor, manager, administrador.",
          "Hacer visible la evolución a lo largo del tiempo, no solo el resultado puntual.",
        ],
        en: [
          "Turn long conversations into understandable indicators.",
          "Back every evaluation with evidence from the conversation itself.",
          "Differentiate the reading by role: seller, manager, administrator.",
          "Make progression over time visible, not just a point-in-time score.",
        ],
      },
      architecture: {
        title: { es: "Enfoque analítico", en: "Analytical approach" },
        body: {
          es: [
            "Capa de evaluación por interacción: cada intercambio se analiza frente a los objetivos del escenario.",
            "Capa de evidencias: toda afirmación evaluativa queda anclada a un fragmento concreto de la conversación.",
            "Capa de agregación: los resultados individuales se combinan en métricas por vendedor, equipo y organización.",
            "Capa de presentación: dashboards distintos según el rol, porque un vendedor y un director no necesitan la misma vista.",
          ],
          en: [
            "Per-interaction evaluation layer: each exchange is analyzed against the scenario objectives.",
            "Evidence layer: every evaluative claim is anchored to a concrete fragment of the conversation.",
            "Aggregation layer: individual results combine into per-seller, per-team and per-organization metrics.",
            "Presentation layer: different dashboards by role, because a seller and a director do not need the same view.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Identificación de las preguntas que cada rol necesita responder.",
            "Definición de las señales que efectivamente pueden derivarse de una sesión.",
            "Diseño de la evaluación y de su verificación contra evidencia.",
            "Agregación progresiva: sesión, vendedor, equipo, empresa.",
            "Iteración sobre los dashboards para reducir ruido y priorizar lo accionable.",
          ],
          en: [
            "Identifying the questions each role needs to answer.",
            "Defining the signals that can actually be derived from a session.",
            "Designing the evaluation and its verification against evidence.",
            "Progressive aggregation: session, seller, team, company.",
            "Iterating on dashboards to reduce noise and prioritize what is actionable.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones", en: "Decisions" },
        body: {
          es: [
            "Toda evaluación debe poder justificarse: sin evidencia asociada, una métrica de desempeño no genera confianza.",
            "Dashboards por rol en lugar de una vista única con filtros: reduce ruido y acelera la lectura.",
            "Priorizar métricas accionables sobre métricas vistosas.",
            "Medir evolución además de estado, porque el entrenamiento es un proceso.",
          ],
          en: [
            "Every evaluation must be justifiable: without attached evidence, a performance metric earns no trust.",
            "Role-based dashboards instead of a single view with filters: less noise, faster reading.",
            "Prioritize actionable metrics over impressive-looking ones.",
            "Measure progression as well as state, because training is a process.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Evaluar lenguaje natural de forma consistente entre sesiones distintas.",
            "Evitar métricas que parecen precisas pero no sostienen una decisión.",
            "Diseñar una lectura útil para perfiles con necesidades muy diferentes.",
            "Mantener la confidencialidad del material trabajado.",
          ],
          en: [
            "Evaluating natural language consistently across different sessions.",
            "Avoiding metrics that look precise but cannot support a decision.",
            "Designing a useful reading for profiles with very different needs.",
            "Maintaining confidentiality of the material involved.",
          ],
        },
      },
      results: {
        es: [
          "Capa analítica que traduce sesiones conversacionales en indicadores por vendedor, equipo y empresa.",
          "Evaluaciones sustentadas en evidencia de la propia conversación.",
          "Dashboards diferenciados por rol con foco en coaching y salud de oportunidades.",
          "Seguimiento de la evolución durante el onboarding y por módulo de entrenamiento.",
        ],
        en: [
          "Analytics layer translating conversational sessions into per-seller, per-team and company indicators.",
          "Evaluations grounded in evidence from the conversation itself.",
          "Role-differentiated dashboards focused on coaching and opportunity health.",
          "Progression tracking during onboarding and per training module.",
        ],
      },
      learnings: {
        es: [
          "Una métrica sin evidencia asociada se cuestiona; una métrica con evidencia se discute y se usa.",
          "El mismo dato necesita presentaciones distintas según quién lo consulte.",
          "Reducir el número de indicadores suele aumentar su utilidad real.",
        ],
        en: [
          "A metric without evidence gets questioned; a metric with evidence gets discussed and used.",
          "The same data needs different presentations depending on who reads it.",
          "Reducing the number of indicators usually increases their real usefulness.",
        ],
      },
    },
  },

  // ──────────────────────────────────── 04 · Simulador hidráulico
  {
    slug: "simulador-hidraulico",
    index: "04",
    name: "Simulador hidráulico de pozos",
    accent: "hydraulic",
    visual: "well-strata",
    featured: true,
    category: ["architecture", "data"],
    role: {
      es: "Arquitectura cliente-servidor y backend",
      en: "Client-server architecture and backend",
    },
    technologies: ["Python", "API REST", "PostgreSQL", "Render", "Base de datos remota"],
    summary: {
      es: "Aplicación de simulación hidráulica con backend desplegado, API y persistencia remota de resultados.",
      en: "Hydraulic simulation application with a deployed backend, API and remote result persistence.",
    },
    description: {
      es: "Aplicación orientada a ejecutar y visualizar simulaciones hidráulicas relacionadas con pozos, con una separación clara entre la capa de presentación, la lógica de simulación y la persistencia de resultados.",
      en: "Application to run and visualize hydraulic simulations related to wells, with a clear separation between presentation, simulation logic and result persistence.",
    },
    problem: {
      es: "Una herramienta de simulación instalada por completo en el equipo del usuario ata la lógica de cálculo a cada instalación: actualizar el modelo implica redistribuir la aplicación, y los resultados quedan aislados en cada máquina.",
      en: "A simulation tool fully installed on the user's machine ties the calculation logic to every installation: updating the model means redistributing the application, and results stay isolated on each machine.",
    },
    solution: {
      es: "Separar la aplicación en un frontend ejecutable que el usuario opera y un backend desplegado como servicio que concentra la lógica y expone una API. Los resultados y usuarios se persisten en una base de datos remota, de modo que la lógica se actualiza en un solo lugar.",
      en: "Split the application into an executable frontend the user operates and a backend deployed as a service that concentrates the logic and exposes an API. Results and users persist in a remote database, so the logic is updated in a single place.",
    },
    contribution: {
      es: [
        "Diseño de la separación entre presentación, lógica de simulación y persistencia.",
        "Backend desplegado como servicio con API para la comunicación con el cliente.",
        "Modelo de datos remoto para usuarios y resultados de simulación.",
        "Gestión de la ejecución y recuperación de simulaciones previas.",
        "Definición de una arquitectura que puede escalar según la cantidad de usuarios.",
      ],
      en: [
        "Designed the separation between presentation, simulation logic and persistence.",
        "Backend deployed as a service with an API for client communication.",
        "Remote data model for users and simulation results.",
        "Execution management and retrieval of previous simulations.",
        "Defined an architecture that can scale with the number of users.",
      ],
    },
    caseStudy: {
      context: {
        es: "Las simulaciones hidráulicas de pozos requieren cálculo sobre parámetros de profundidad, presión y propiedades del fluido. El interés del proyecto estuvo en cómo distribuir ese cálculo entre cliente y servidor.",
        en: "Hydraulic well simulations require computation over depth, pressure and fluid property parameters. The project's interest was how to distribute that computation between client and server.",
      },
      objectives: {
        es: [
          "Permitir ejecutar simulaciones sin instalar toda la lógica en cada equipo.",
          "Centralizar los resultados en una base de datos accesible.",
          "Mantener la aplicación utilizable para el usuario final.",
          "Dejar preparada una arquitectura que admita crecimiento.",
        ],
        en: [
          "Allow running simulations without installing all the logic on each machine.",
          "Centralize results in an accessible database.",
          "Keep the application usable for the end user.",
          "Leave an architecture ready to grow.",
        ],
      },
      architecture: {
        title: { es: "Arquitectura", en: "Architecture" },
        body: {
          es: [
            "Cliente: aplicación de escritorio o frontend ejecutable que recoge parámetros y presenta resultados.",
            "Servicio: backend desplegado que concentra la lógica de simulación.",
            "API: contrato de comunicación entre cliente y servicio.",
            "Persistencia: base de datos remota con usuarios y resultados de simulación.",
            "La separación permite actualizar el modelo de cálculo sin redistribuir el cliente.",
          ],
          en: [
            "Client: desktop application or executable frontend that collects parameters and presents results.",
            "Service: deployed backend concentrating the simulation logic.",
            "API: communication contract between client and service.",
            "Persistence: remote database with users and simulation results.",
            "The separation allows updating the calculation model without redistributing the client.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Definición de los parámetros de entrada de la simulación.",
            "Traslado de la lógica de cálculo al backend.",
            "Diseño del contrato de API entre cliente y servicio.",
            "Modelado de la persistencia de usuarios y resultados.",
            "Despliegue del backend y verificación de la comunicación completa.",
          ],
          en: [
            "Defining the simulation input parameters.",
            "Moving the calculation logic to the backend.",
            "Designing the API contract between client and service.",
            "Modeling user and result persistence.",
            "Deploying the backend and verifying end-to-end communication.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones", en: "Decisions" },
        body: {
          es: [
            "Lógica en el servidor en lugar de en el ejecutable: una sola fuente de verdad para el modelo de cálculo.",
            "Base de datos remota: los resultados sobreviven al equipo donde se generaron.",
            "API explícita: el cliente puede cambiar de tecnología sin reescribir la simulación.",
          ],
          en: [
            "Logic on the server rather than in the executable: a single source of truth for the calculation model.",
            "Remote database: results outlive the machine where they were generated.",
            "Explicit API: the client can change technology without rewriting the simulation.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Definir qué parte del cálculo permanece en el cliente y cuál viaja al servicio.",
            "Manejar la latencia sin degradar la experiencia de uso.",
            "Mantener consistente el contrato de la API durante los cambios del modelo.",
          ],
          en: [
            "Defining which part of the computation stays on the client and which travels to the service.",
            "Handling latency without degrading the usage experience.",
            "Keeping the API contract consistent while the model changed.",
          ],
        },
      },
      results: {
        es: [
          "Aplicación funcional con lógica centralizada en un backend desplegado.",
          "Resultados y usuarios persistidos en una base de datos remota.",
          "Arquitectura con capas separadas que admite crecimiento en número de usuarios.",
        ],
        en: [
          "Functional application with logic centralized in a deployed backend.",
          "Results and users persisted in a remote database.",
          "Layered architecture that supports growth in the number of users.",
        ],
      },
      learnings: {
        es: [
          "Separar cliente y lógica desde el inicio evita reescrituras costosas más adelante.",
          "Un contrato de API explícito es lo que hace posible que las capas evolucionen por separado.",
        ],
        en: [
          "Separating client and logic from the start avoids costly rewrites later.",
          "An explicit API contract is what lets layers evolve independently.",
        ],
      },
    },
  },

  // ─────────────────────────── 05 · Presentaciones digitales
  {
    slug: "presentaciones-digitales",
    index: "05",
    name: "Presentaciones digitales para negocios",
    accent: "craft",
    visual: "qr-cards",
    featured: true,
    category: ["web"],
    role: {
      es: "Diseño, desarrollo y despliegue",
      en: "Design, development and deployment",
    },
    technologies: ["HTML", "CSS", "JavaScript", "Cloudflare Pages", "GitHub", "QR"],
    summary: {
      es: "Landings a medida accesibles por QR, publicadas sin costos recurrentes y con el código en manos del cliente.",
      en: "Bespoke QR-accessible landing pages, published with no recurring cost and with the code owned by the client.",
    },
    description: {
      es: "Diseño y desarrollo de presentaciones digitales tipo landing page para negocios, accesibles mediante códigos QR. Cada proyecto se entrega con su repositorio, su publicación y sus recursos organizados, de modo que el cliente conserve el control.",
      en: "Design and development of landing-page style digital presentations for businesses, accessible through QR codes. Each project is delivered with its repository, publication and organized assets, so the client keeps control.",
    },
    problem: {
      es: "Muchos negocios pequeños dependen de plataformas con suscripción mensual para tener presencia digital, sin acceso real a su código ni a sus recursos. Cuando dejan de pagar, pierden el sitio.",
      en: "Many small businesses depend on subscription platforms for their digital presence, with no real access to their code or assets. When they stop paying, they lose the site.",
    },
    solution: {
      es: "Sitios estáticos ligeros con identidad propia, publicados en Cloudflare Pages y accesibles por QR. El repositorio queda en GitHub y los recursos organizados en almacenamiento del cliente, evitando dependencia permanente del proveedor.",
      en: "Lightweight static sites with their own identity, published on Cloudflare Pages and reachable via QR. The repository stays on GitHub and assets stay organized in client storage, avoiding permanent vendor dependency.",
    },
    contribution: {
      es: [
        "Diseño de identidad visual específica para cada negocio.",
        "Desarrollo de sitios estáticos ligeros y responsive.",
        "Publicación en Cloudflare Pages sin costos mensuales obligatorios de alojamiento.",
        "Generación de acceso mediante código QR para uso en punto físico.",
        "Repositorio administrado en GitHub y recursos organizados para el cliente.",
      ],
      en: [
        "Designed a specific visual identity for each business.",
        "Developed lightweight, responsive static sites.",
        "Published on Cloudflare Pages with no mandatory monthly hosting cost.",
        "Generated QR-code access for use at the physical location.",
        "Repository managed on GitHub and assets organized for the client.",
      ],
    },
    caseStudy: {
      context: {
        es: "Dos negocios con necesidades muy distintas: un proyecto de bienestar que requería una estética orgánica y editorial, y una empresa de fabricación metálica en Texas que necesitaba comunicar capacidad técnica y confianza industrial.",
        en: "Two businesses with very different needs: a wellness project requiring an organic, editorial aesthetic, and a metal fabrication company in Texas that needed to communicate technical capability and industrial trust.",
      },
      objectives: {
        es: [
          "Entregar presencia digital propia, no una plantilla alquilada.",
          "Permitir acceso inmediato desde el punto físico mediante QR.",
          "Evitar costos recurrentes obligatorios de alojamiento.",
          "Dejar al cliente el control de su código y sus recursos.",
        ],
        en: [
          "Deliver an owned digital presence, not a rented template.",
          "Enable immediate access from the physical location via QR.",
          "Avoid mandatory recurring hosting costs.",
          "Leave the client in control of their code and assets.",
        ],
      },
      architecture: {
        title: { es: "Casos realizados", en: "Delivered cases" },
        body: {
          es: [
            "Vía Paulette — proyecto de bienestar con identidad visual orgánica, minimalista y editorial. Diseño personalizado, publicación en Cloudflare Pages, acceso por QR, repositorio en GitHub y recursos organizados en Google Drive.",
            "Forza Special Welding LLC — presentación digital para una empresa de fabricación metálica y soldadura ubicada en Texas.",
            "Servicios representados en Forza: fabricación metálica personalizada, soldadura MIG y TIG, trabajo con acero, aluminio y bronce, reparación de trailers, estructuras, mobiliario, piezas industriales y modificaciones especiales.",
          ],
          en: [
            "Vía Paulette — wellness project with an organic, minimal, editorial visual identity. Custom design, Cloudflare Pages publication, QR access, GitHub repository and assets organized in Google Drive.",
            "Forza Special Welding LLC — digital presentation for a metal fabrication and welding company based in Texas.",
            "Services represented for Forza: custom metal fabrication, MIG and TIG welding, work with steel, aluminum and bronze, trailer repair, structures, furniture, industrial parts and special modifications.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Conversación con el negocio para entender qué debe comunicar el sitio.",
            "Definición de la identidad visual acorde al sector.",
            "Desarrollo del sitio estático priorizando velocidad de carga en móvil.",
            "Publicación y generación del código QR.",
            "Entrega del repositorio y de los recursos organizados.",
          ],
          en: [
            "Conversation with the business to understand what the site must communicate.",
            "Definition of a visual identity appropriate to the sector.",
            "Static site development prioritizing mobile load speed.",
            "Publication and QR code generation.",
            "Handover of the repository and organized assets.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones", en: "Decisions" },
        body: {
          es: [
            "Sitios estáticos: la carga es casi inmediata y el alojamiento no genera costo recurrente obligatorio.",
            "Cloudflare Pages: despliegue continuo desde el repositorio sin infraestructura que administrar.",
            "Identidad propia por cliente: dos negocios distintos no deben verse igual.",
            "Entrega de código y recursos: el cliente puede continuar con otro proveedor si lo decide.",
          ],
          en: [
            "Static sites: near-instant loading and no mandatory recurring hosting cost.",
            "Cloudflare Pages: continuous deployment from the repository with no infrastructure to manage.",
            "Per-client identity: two different businesses should not look alike.",
            "Code and asset handover: the client can continue with another provider if they choose.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Traducir dos sectores muy distintos —bienestar y metalmecánica— en lenguajes visuales coherentes.",
            "Optimizar la carga para visitantes que escanean el QR con conexión móvil variable.",
            "Organizar los recursos de forma que el cliente pueda mantenerlos por su cuenta.",
          ],
          en: [
            "Translating two very different sectors — wellness and metalworking — into coherent visual languages.",
            "Optimizing load time for visitors scanning the QR on variable mobile connections.",
            "Organizing assets so the client can maintain them independently.",
          ],
        },
      },
      results: {
        es: [
          "Dos presentaciones digitales publicadas y accesibles mediante QR.",
          "Alojamiento sin costos mensuales obligatorios.",
          "Clientes con control efectivo sobre su código, su publicación y sus recursos.",
        ],
        en: [
          "Two digital presentations published and reachable via QR.",
          "Hosting with no mandatory monthly cost.",
          "Clients with effective control over their code, publication and assets.",
        ],
      },
      learnings: {
        es: [
          "La independencia técnica del cliente es un argumento de venta, no una concesión.",
          "En un sitio al que se llega por QR, el primer segundo de carga decide la experiencia.",
        ],
        en: [
          "Client technical independence is a selling point, not a concession.",
          "On a site reached via QR, the first second of loading decides the experience.",
        ],
      },
    },
  },

  // ──────────────────────────────────────────────── 06 · Hitdash
  {
    slug: "hitdash",
    index: "06",
    name: "Hitdash",
    accent: "arcade",
    visual: "pixel-arena",
    featured: true,
    category: ["game"],
    role: {
      es: "Desarrollo en equipo",
      en: "Team development",
    },
    technologies: ["Game development", "Pixel art", "Sprites", "Diseño de niveles"],
    summary: {
      es: "Hack and slash 2D de dungeon con perspectiva pseudo-3D y dificultad progresiva, desarrollado en equipo.",
      en: "2D dungeon hack-and-slash with pseudo-3D perspective and progressive difficulty, built as a team.",
    },
    description: {
      es: "Videojuego académico 2D del género hack and slash, desarrollado en equipo. Ambientado en un dungeon, utiliza una perspectiva semilateral que genera sensación pseudo-3D y una curva de dificultad que crece con la variedad y cantidad de enemigos.",
      en: "Academic 2D hack-and-slash game developed as a team. Set in a dungeon, it uses a semi-lateral perspective that creates a pseudo-3D feel and a difficulty curve that grows with enemy variety and count.",
    },
    problem: {
      es: "Un proyecto académico de videojuego debe equilibrar alcance y calidad: entregar algo jugable y coherente dentro del tiempo disponible y con un equipo que aprende mientras construye.",
      en: "An academic game project must balance scope and quality: deliver something playable and coherent within the available time, with a team learning while building.",
    },
    solution: {
      es: "Un dungeon crawler acotado, con perspectiva semilateral que aporta profundidad sin el costo de un motor 3D, sprites animados para personajes y enemigos, efectos de humo y magia, y una progresión de dificultad basada en composición de enemigos.",
      en: "A tightly scoped dungeon crawler with a semi-lateral perspective providing depth without the cost of a 3D engine, animated sprites for characters and enemies, smoke and magic effects, and difficulty progression driven by enemy composition.",
    },
    contribution: {
      es: [
        "Desarrollo del videojuego en equipo, dentro de un contexto académico.",
        "Perspectiva semilateral para lograr sensación pseudo-3D en un juego 2D.",
        "Sistema de dificultad progresiva basado en variedad y cantidad de enemigos.",
        "Integración de sprites, fondos en pixel art y personajes animados.",
        "Efectos visuales de humo y magia.",
      ],
      en: [
        "Team development of the game within an academic context.",
        "Semi-lateral perspective to achieve a pseudo-3D feel in a 2D game.",
        "Progressive difficulty system based on enemy variety and count.",
        "Integration of sprites, pixel-art backgrounds and animated characters.",
        "Smoke and magic visual effects.",
      ],
    },
    caseStudy: {
      context: {
        es: "Proyecto académico de desarrollo de videojuegos, ejecutado en equipo, con foco en que el resultado fuera efectivamente jugable y no solo una demostración técnica.",
        en: "Academic game development project, executed as a team, focused on producing something actually playable rather than only a technical demo.",
      },
      objectives: {
        es: [
          "Entregar un juego jugable de principio a fin dentro del plazo académico.",
          "Lograr sensación de profundidad sin recurrir a un motor 3D.",
          "Diseñar una curva de dificultad que sostenga el interés.",
        ],
        en: [
          "Deliver a game playable from start to finish within the academic deadline.",
          "Achieve a sense of depth without resorting to a 3D engine.",
          "Design a difficulty curve that sustains interest.",
        ],
      },
      architecture: {
        title: { es: "Diseño del juego", en: "Game design" },
        body: {
          es: [
            "Ambientación de dungeon con fondos en pixel art.",
            "Perspectiva semilateral que produce sensación pseudo-3D.",
            "Personajes y enemigos animados mediante sprites.",
            "Efectos de humo y efectos mágicos para reforzar el impacto de las acciones.",
            "Dificultad progresiva mediante mayor variedad y cantidad de enemigos.",
          ],
          en: [
            "Dungeon setting with pixel-art backgrounds.",
            "Semi-lateral perspective producing a pseudo-3D feel.",
            "Sprite-animated characters and enemies.",
            "Smoke and magic effects reinforcing the impact of actions.",
            "Progressive difficulty through greater enemy variety and count.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Definición del alcance jugable mínimo.",
            "Reparto de responsabilidades dentro del equipo.",
            "Producción de sprites, fondos y animaciones.",
            "Ajuste iterativo de la dificultad mediante pruebas de juego.",
          ],
          en: [
            "Defining the minimum playable scope.",
            "Distributing responsibilities within the team.",
            "Producing sprites, backgrounds and animations.",
            "Iteratively tuning difficulty through playtesting.",
          ],
        },
      },
      decisions: {
        title: { es: "Decisiones", en: "Decisions" },
        body: {
          es: [
            "2D con perspectiva semilateral en lugar de 3D real: profundidad visual a una fracción del costo de producción.",
            "Dificultad por composición de enemigos en lugar de inflar estadísticas: más interesante de jugar.",
            "Alcance acotado desde el inicio para poder terminar el juego.",
          ],
          en: [
            "2D with a semi-lateral perspective instead of true 3D: visual depth at a fraction of the production cost.",
            "Difficulty via enemy composition rather than inflated stats: more interesting to play.",
            "Scope bounded from the start so the game could actually be finished.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Mantener coherencia visual entre recursos producidos por varias personas.",
            "Equilibrar la dificultad para que resulte exigente sin ser frustrante.",
            "Coordinar el trabajo en equipo dentro de un plazo académico.",
          ],
          en: [
            "Keeping visual coherence across assets produced by several people.",
            "Balancing difficulty so it feels demanding without becoming frustrating.",
            "Coordinating team work within an academic deadline.",
          ],
        },
      },
      results: {
        es: [
          "Videojuego jugable con ambientación de dungeon y progresión de dificultad.",
          "Estilo visual coherente en pixel art con personajes y enemigos animados.",
          "Experiencia de desarrollo colaborativo de un producto interactivo completo.",
        ],
        en: [
          "Playable game with dungeon setting and difficulty progression.",
          "Coherent pixel-art visual style with animated characters and enemies.",
          "Experience of collaboratively developing a complete interactive product.",
        ],
      },
      learnings: {
        es: [
          "Acotar el alcance temprano es lo que permite terminar un proyecto en equipo.",
          "Una restricción técnica bien elegida puede convertirse en identidad visual.",
        ],
        en: [
          "Bounding scope early is what allows a team project to be finished.",
          "A well-chosen technical constraint can become a visual identity.",
        ],
      },
    },
  },

  // ────────────────────────────────────────── 07 · IA local
  {
    slug: "entorno-ia-local",
    index: "07",
    name: "Entorno local para inteligencia artificial",
    accent: "terminal",
    visual: "local-core",
    featured: true,
    category: ["ai", "architecture"],
    role: {
      es: "Configuración, evaluación y optimización",
      en: "Setup, evaluation and optimization",
    },
    technologies: ["Ollama", "Qwen Coder", "OpenCode", "VS Code", "Linux", "Windows"],
    summary: {
      es: "Evaluación práctica de modelos y asistentes de código ejecutados localmente frente a servicios en la nube.",
      en: "Hands-on evaluation of locally run models and coding assistants versus cloud services.",
    },
    description: {
      es: "Configuración y evaluación de herramientas locales para trabajar con modelos de lenguaje y asistentes de programación sin depender completamente de servicios en la nube, midiendo qué se gana y qué se pierde en cada escenario.",
      en: "Setup and evaluation of local tooling to work with language models and coding assistants without fully depending on cloud services, measuring what is gained and lost in each scenario.",
    },
    problem: {
      es: "Depender por completo de servicios en la nube para asistencia de código implica costo por uso, envío de contexto fuera del equipo y dependencia de conectividad. La alternativa local existe, pero no es gratuita en términos de hardware y calidad.",
      en: "Depending entirely on cloud services for coding assistance means per-use cost, sending context off the machine and connectivity dependence. The local alternative exists, but is not free in hardware or quality terms.",
    },
    solution: {
      es: "Montar un entorno local con Ollama y modelos como Qwen Coder, integrarlo al flujo de trabajo mediante OpenCode y VS Code, y evaluar el resultado midiendo consumo de CPU y GPU, tamaño de contexto manejable y calidad frente a la inferencia en la nube.",
      en: "Set up a local environment with Ollama and models such as Qwen Coder, integrate it into the workflow through OpenCode and VS Code, and evaluate the result by measuring CPU and GPU usage, manageable context size and quality against cloud inference.",
    },
    contribution: {
      es: [
        "Configuración de Ollama y ejecución de modelos locales, incluyendo Qwen Coder.",
        "Integración de OpenCode con VS Code dentro del flujo de trabajo real.",
        "Ajuste del tamaño de contexto según los recursos disponibles.",
        "Evaluación del consumo de CPU y GPU en distintas configuraciones.",
        "Comparación entre inferencia local y servicios cloud en términos de costo, latencia y calidad.",
      ],
      en: [
        "Configured Ollama and ran local models, including Qwen Coder.",
        "Integrated OpenCode with VS Code inside the real workflow.",
        "Tuned context size according to available resources.",
        "Evaluated CPU and GPU usage across configurations.",
        "Compared local inference against cloud services in cost, latency and quality terms.",
      ],
    },
    caseStudy: {
      context: {
        es: "La asistencia de código con modelos de lenguaje se volvió parte del trabajo diario. Entender el escenario local no es una curiosidad: define el costo y la autonomía del entorno de desarrollo.",
        en: "Language-model coding assistance became part of daily work. Understanding the local scenario is not a curiosity: it defines the cost and autonomy of the development environment.",
      },
      objectives: {
        es: [
          "Ejecutar modelos de lenguaje en hardware propio de forma utilizable.",
          "Integrar el asistente local al editor sin fricción.",
          "Medir el costo real en recursos de la inferencia local.",
          "Determinar en qué tareas conviene local y en cuáles conviene nube.",
        ],
        en: [
          "Run language models on own hardware in a usable way.",
          "Integrate the local assistant into the editor without friction.",
          "Measure the real resource cost of local inference.",
          "Determine which tasks suit local and which suit cloud.",
        ],
      },
      architecture: {
        title: { es: "Montaje", en: "Setup" },
        body: {
          es: [
            "Ollama como runtime de modelos locales.",
            "Qwen Coder como modelo orientado a tareas de programación.",
            "OpenCode como capa de asistencia integrada al editor.",
            "VS Code como entorno de trabajo, en Linux y Windows.",
            "Configuración de contexto ajustada a la memoria disponible.",
          ],
          en: [
            "Ollama as the local model runtime.",
            "Qwen Coder as a programming-oriented model.",
            "OpenCode as the editor-integrated assistance layer.",
            "VS Code as the working environment, on Linux and Windows.",
            "Context configuration tuned to available memory.",
          ],
        },
      },
      process: {
        title: { es: "Proceso", en: "Process" },
        body: {
          es: [
            "Instalación del runtime y descarga de modelos de distintos tamaños.",
            "Integración con el editor y verificación del flujo de trabajo completo.",
            "Medición de consumo de CPU y GPU durante la inferencia.",
            "Ajuste del contexto para encontrar el punto utilizable en el hardware disponible.",
            "Comparación de resultados frente a servicios en la nube en tareas equivalentes.",
          ],
          en: [
            "Runtime installation and download of models at different sizes.",
            "Editor integration and verification of the full workflow.",
            "CPU and GPU usage measurement during inference.",
            "Context tuning to find the usable point on the available hardware.",
            "Comparison against cloud services on equivalent tasks.",
          ],
        },
      },
      decisions: {
        title: { es: "Conclusiones", en: "Conclusions" },
        body: {
          es: [
            "El tamaño de contexto, no solo el tamaño del modelo, es lo que suele limitar el uso local.",
            "La inferencia local resulta razonable para tareas acotadas y repetitivas donde la latencia predecible importa más que la profundidad.",
            "Los servicios en la nube mantienen ventaja en tareas de razonamiento extenso y contexto amplio.",
            "Un entorno híbrido —local para lo rutinario, nube para lo complejo— es más práctico que elegir un solo extremo.",
          ],
          en: [
            "Context size, not just model size, is usually what limits local usage.",
            "Local inference is reasonable for bounded, repetitive tasks where predictable latency matters more than depth.",
            "Cloud services keep the advantage on long-reasoning, wide-context tasks.",
            "A hybrid setup — local for routine, cloud for complex — is more practical than picking one extreme.",
          ],
        },
      },
      challenges: {
        title: { es: "Desafíos", en: "Challenges" },
        body: {
          es: [
            "Ajustar el tamaño del modelo y el contexto a la memoria de GPU disponible.",
            "Evitar que la inferencia local degradara el rendimiento del resto del entorno de trabajo.",
            "Comparar calidad de forma honesta entre configuraciones muy distintas.",
          ],
          en: [
            "Fitting model and context size to available GPU memory.",
            "Preventing local inference from degrading the rest of the working environment.",
            "Comparing quality honestly across very different configurations.",
          ],
        },
      },
      results: {
        es: [
          "Entorno de asistencia de código funcionando localmente e integrado al editor.",
          "Criterio propio sobre cuándo conviene inferencia local y cuándo servicios en la nube.",
          "Configuración de contexto y recursos ajustada al hardware disponible.",
        ],
        en: [
          "Local coding-assistance environment running and integrated into the editor.",
          "Own judgment on when local inference is worthwhile and when cloud services are.",
          "Context and resource configuration tuned to the available hardware.",
        ],
      },
      learnings: {
        es: [
          "Probar una herramienta en el flujo de trabajo real dice más que cualquier benchmark publicado.",
          "La autonomía tiene un costo medible en hardware; conviene conocerlo antes de decidir.",
        ],
        en: [
          "Testing a tool inside the real workflow says more than any published benchmark.",
          "Autonomy has a measurable hardware cost; it is worth knowing before deciding.",
        ],
      },
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next project in display order, wrapping around at the end. */
export function getNextProject(slug: string): Project | undefined {
  const current = projects.findIndex((project) => project.slug === slug);
  if (current === -1) return undefined;
  return projects[(current + 1) % projects.length];
}
