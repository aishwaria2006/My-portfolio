// ---------------------------------------------------------------------------
// All portfolio content lives here. Everything is taken from the resume.
// Anything marked TODO is a placeholder to replace with your own material.
// To add a project or role later, add an entry to the relevant array.
// ---------------------------------------------------------------------------

export const PLACEHOLDER = "TODO";

export const person = {
  name: "Aishwaria V",
  firstName: "Aishwaria",
  title: "AI Engineer in DevOps",
  headline: "I build intelligent systems and bring them to production.",
  // One sentence for the hero. The longer intro is used on the About page.
  tagline: "Software Developer Intern at Adya AI. I ship agentic features and run the cloud they live on.",
  intro:
    "Software Developer Intern at Adya AI, where I build product features for RAI and Cloud Studio and run the company's DevOps across three cloud providers. Final-year B.Tech student in Artificial Intelligence and Data Science.",
  status: "Building agentic infrastructure at Adya AI",
  location: "Coimbatore, India",
  email: "aishwariav06@gmail.com",
  phone: "+91 9442312201",
  links: {
    linkedin: "https://www.linkedin.com/in/aishwaria-v-450138299",
    github: "https://github.com/aishwaria2006",
    leetcode: "https://leetcode.com/u/aishwaria06/",
  },
  // Put your resume PDF at public/Aishwaria_V_Resume.pdf
  resumeUrl: "/Aishwaria_V_Resume.pdf",
  // Portraits in public/. `photoPosition` is the CSS object-position used to frame each one.
  photo: "/photo-formal.jpg" as string | null, // hero: blazer, plain wall
  photoPosition: "50% 28%",
  photoCaption: "Portrait, 2025",
  photoAlt: "/photo.jpg" as string | null, // about page: chin on hand, smiling
  photoAltPosition: "50% 38%",
  photoAltCaption: "Off duty, 2025",
};

// Words that rotate in the hero headline. All are things the resume shows her doing.
export const heroRoles = ["agentic systems", "cloud infrastructure", "MCP gateways", "voice interfaces", "CI/CD pipelines", "LLM platforms"];

// Verified numbers only. Each one comes from a resume line. The homepage shows these four.
export const glance = [
  { value: "4", unit: "×", label: "national hackathon wins", source: "First place, Sep 2025 to Feb 2026", accent: "gold" },
  { value: "3", label: "clouds provisioned", source: "Azure, AWS and GCP", accent: "lavender" },
  { value: "4", label: "production clusters", source: "Internal DevOps at Adya AI", accent: "mint" },
  { value: "100", unit: "+", label: "outreaches by the CEO's agent", source: "GTM Agent, deployed independently", accent: "coral" },
];

export type Block = { title: string; note?: string; points: { label?: string; text: string }[] };

export type Role = {
  slug: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  // Three one-line highlights for the homepage. Full detail lives in `blocks`.
  highlights?: { glyph: string; text: string }[];
  blocks: Block[];
};

export const experience: Role[] = [
  {
    slug: "adya-ai",
    org: "Adya AI",
    role: "Software Developer Intern",
    period: "May 2026 - Present",
    summary:
      "Product development on RAI and Cloud Studio, and ownership of the company's DevOps: provisioning, clusters, pipelines, data layer and monitoring.",
    stack: ["Go", "Node.js", "React", "MongoDB", "Kubernetes", "Jenkins", "AWS", "Azure", "GCP", "Terraform", "Prometheus", "Grafana", "MCP"],
    highlights: [
      { glyph: "☁", text: "Own the company's DevOps across Azure, AWS and GCP: four production clusters, pipelines, data layer and monitoring." },
      { glyph: "⚡", text: "Shipped the CEO's outreach agent to production on my own: MCP tools, reply tracking, 100+ outreaches." },
      { glyph: "⚙", text: "Build RAI's MCP gateway and Cloud Studio's onboarding, VM filtering and snapshot job system in Go." },
    ],
    blocks: [
      {
        title: "GTM Agent for the CEO",
        note: "First project deployed independently on the company server",
        points: [
          { text: "Developed an outreach agent that runs the CEO's LinkedIn and email campaigns end to end, and deployed it to production on the company server. Over 100 outreaches sent to date." },
          { text: "Integrated multiple MCP servers as the agent's tools and tuned message generation to match the CEO's writing tone." },
          { text: "Implemented reply tracking and calendar integration so the agent picks up replies and plans around the CEO's schedule." },
        ],
      },
      {
        title: "RAI",
        note: "Adya's core product",
        points: [
          { label: "MCP & Agents", text: "Build RAI's MCP gateway (MCP server connections and tool registration for agents) and multi-agent features." },
          { label: "Lead Import", text: "Built the GTM Sales CRM's CSV/Excel import with field mapping (including LLM-suggested mapping), live progress and retryable history. Duplicate organizations are matched by domain or name; duplicate leads are merged." },
          { label: "Multi-Tenant Security", text: "Enforced tenant isolation across 11 CRM services by scoping every query to the caller's company ID." },
          { label: "CRM Features", text: "Built the leads, organizations and deals APIs with filtering, sorting, pagination and MongoDB indexes, plus HubSpot contact import, an analytics dashboard and AI message generation in the campaign wizard." },
        ],
      },
      {
        title: "Cloud Studio",
        note: "Adya's cloud provisioning product",
        points: [
          { label: "Client Onboarding", text: "Built cloud account onboarding end to end across React, Go and Node. Clients authorize Azure through Lighthouse delegation or AWS through a cross-account IAM role locked to an External ID, using pre-filled ARM and CloudFormation templates; the backend verifies access through the provider's APIs before onboarding." },
          { label: "VM Filtering", text: "Implemented Azure VM filtering so clients only see the sizes and regions their subscription can deploy, excluding restricted SKUs and zones, unregistered regions and regions without enough vCPU quota, using the Compute SKUs and Usages APIs with caching and throttle-aware retries." },
          { label: "Snapshot Job System", text: "Built a background job system in Go and MongoDB that keeps a ready VM snapshot for every customer account: jobs are claimed atomically with lock heartbeats, priority regions are built first, and existing data is served while a refresh runs. Added a daily sync of the Azure VM catalogue with a guard against wiping it on bad API data." },
          { label: "CLI to REST Migration", text: "Replaced about 20 az commands and the gcloud calls with direct Azure and GCP REST APIs, and moved AWS cluster access to the SDK, with polling for long-running operations (about 1,600 lines). Also fixed pricing fallbacks, GCP quota mapping and deployment status tracking." },
          { label: "Agentic Mode (in progress)", text: "Building a mode where clients request infrastructure in plain language. The agent generates Terraform, asks for confirmation, then runs init, validate, plan and apply with live status. Prototype works on Azure; now adding approvals, cost estimates, permissions and rollback." },
        ],
      },
      {
        title: "Internal DevOps",
        points: [
          { label: "Infrastructure", text: "Own DevOps for the company. Provision infrastructure across three cloud providers, from VMs upward, and run production deployments and workflows across four clusters." },
          { label: "CI/CD & Models", text: "Manage Kubernetes workloads, the Jenkins pipelines, and an AWS CodeBuild pipeline that pushes images to Azure Container Registry. Handle model deployments, AWS Bedrock keys and every database migration." },
          { label: "Data Layer", text: "Deploy and manage MongoDB, PostgreSQL, Elasticsearch, Redis, Kafka, Airbyte, Weaviate and LiveKit." },
          { label: "Monitoring", text: "Set up Prometheus and Grafana for all provisioned infrastructure to catch issues before they become outages." },
          { label: "Automation", text: "Automated daily operational tasks and built a bot that whitelists LLMs, databases and VMs automatically." },
          { label: "LLM Usage Tracking", text: "Built a platform that tracks spend on every Azure and AWS LLM key: it auto-deactivates keys over budget and reactivates them from the same site, warns users about usage, and offers role-based dashboards with filters." },
        ],
      },
      {
        title: "Client Delivery",
        points: [
          { label: "Castlewise", text: "Adya's DevOps engineer on the Castlewise project, responsible for deployments, CI/CD pipelines, database setup, blob storage and storage accounts, and the point of contact between Adya and AWS." },
          { label: "Client & Programme Support", text: "Join client meetings and demos to resolve LLM key and DevOps questions, and support student scholars in Adya's programmes with DevOps, cloud and LLM problems." },
        ],
      },
    ],
  },
  {
    slug: "infosys-springboard",
    org: "Infosys Springboard",
    role: "AI Intern",
    period: "Dec 2025 - Feb 2026",
    summary: "Applied LLMs to financial data queries and built ML pipelines in a microservices architecture.",
    stack: ["LLMs", "SQL", "Microservices", "ML pipelines"],
    blocks: [
      {
        title: "Internship work",
        points: [
          { text: "Built an AI-powered stock screening platform where LLMs translate natural-language queries into DSL/JSON and optimized SQL." },
          { text: "Developed ML pipelines for real-time data processing in a microservices architecture, improving query throughput and latency." },
        ],
      },
    ],
  },
];

export type Accent = "lavender" | "coral" | "mint" | "gold";
export type Art = "pulse" | "spectrum" | "roadmap" | "dialogue" | "funnel";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  status?: string;
  award?: string;
  stack: string[];
  overview: string;
  problem: string;
  architecture: string[];
  contribution: string;
  highlights: string[];
  challenges: string;
  results: string;
  github: string | null;
  demo: string | null;
  // Shown on the homepage when true (three at most)
  featured?: boolean;
  // Visual identity for the generated artwork
  accent: Accent;
  art: Art;
  // Put a screenshot in public/projects/ and set e.g. "/projects/relife.png"
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "machinespeak",
    name: "MachineSpeak",
    tagline: "Voice assistant for device health",
    period: "May 2026 - Present",
    status: "Research project, in progress",
    award: "Best Presentation, Annual R&D Symposium",
    stack: ["Python", "asyncio", "Qwen3-4B (GGUF)", "psutil", "Speech-to-text", "Text-to-speech"],
    featured: true,
    accent: "lavender",
    art: "pulse",
    overview:
      "A research project in which devices explain their own health problems by voice. Currently implemented as a two-laptop system and being extended to work across all devices.",
    problem:
      "When a machine slows down or overheats, the signals are buried in task managers and logs that most people never open. MachineSpeak turns raw telemetry into a spoken explanation and a safe fix, so the device itself tells you what is wrong and what it is about to do about it.",
    architecture: [
      "Client laptop streams CPU, RAM, GPU, temperature, battery and top-process data every second.",
      "Data travels over an asyncio TCP connection using newline-delimited JSON, reconnecting with exponential backoff.",
      "The brain laptop detects what the user is doing and scores risk with per-context rules.",
      "When needed, it wakes a local quantized Qwen3-4B model (Q4_K_M) that explains the problem by voice.",
      "The brain can remotely kill the culprit process, with checks that block system processes.",
    ],
    contribution: "Solo project.",
    highlights: [
      "Two-laptop telemetry pipeline over asyncio TCP",
      "Context-aware, rule-based risk scoring",
      "Local quantized LLM, woken only when needed",
      "Voice interaction and safe remote process control",
    ],
    challenges:
      "Keeping a one-second telemetry stream alive across flaky links meant designing the reconnect path with exponential backoff rather than assuming a stable socket. Running a 4B-parameter model locally forced a quantized build and a rule-based gate so the model only wakes when the risk score justifies it. Remote process control needed hard guards against ever killing a system process.",
    results: "Won Best Presentation at the Annual R&D Symposium (Multicoreware & KGISL, Tamil Nadu, Aug 2026). Now being extended from two laptops to all devices.",
    github: null,
    demo: null,
  },
  {
    slug: "alzheimers-voice-detection",
    name: "Early Detection of Alzheimer's Disease",
    tagline: "Detection via voice pattern analysis",
    period: "Feb 2026",
    stack: ["MFCCs", "Whisper ASR", "BERT", "ClinicalBERT", "SHAP", "LIME"],
    accent: "mint",
    art: "spectrum",
    overview: "A multimodal AI system that analyses voice patterns for early signs of Alzheimer's disease.",
    problem:
      "Early cognitive decline shows up in how people speak before it shows up on scans: pauses, word-finding, acoustic changes. A voice sample is cheap and non-invasive to collect, so the goal was a screening signal that combines what is said with how it is said, and that can explain its own prediction to a clinician.",
    architecture: [
      "Acoustic features extracted as MFCCs.",
      "Speech transcribed with Whisper ASR.",
      "Language analysed with BERT and ClinicalBERT.",
      "Predictions explained with SHAP and LIME.",
    ],
    contribution: "Solo project.",
    highlights: [
      "Multimodal: acoustic and language features",
      "Trained on an NVIDIA RTX A6000 GPU",
      "SHAP/LIME explainability and optimized inference",
    ],
    challenges:
      "Fusing two very different signals, MFCC acoustic features and transformer text embeddings, into one classifier without one modality drowning out the other. Explainability was a requirement rather than an add-on, so SHAP and LIME had to work across both branches, and inference was optimised so the system is usable outside the training GPU.",
    results: "Delivered a working multimodal pipeline with per-prediction explanations, trained on an NVIDIA RTX A6000.",
    github: null,
    demo: null,
  },
  {
    slug: "relife-os",
    name: "ReLife OS",
    tagline: "Reintegration platform for released prisoners",
    period: "Dec 2025",
    stack: ["Flask", "FastAPI", "React", "Vite", "MongoDB", "Groq (Llama 3.1)", "GPT-4o-mini", "JWT", "Telegram Bot API"],
    featured: true,
    accent: "coral",
    art: "roadmap",
    overview:
      "A 5-service platform in 5 Indian languages that turns a conversational intake into a structured profile and a 100-day reintegration roadmap.",
    problem:
      "People leaving prison face the same first hundred days: no job, no paperwork, no money and very little trust, often in a language the available services do not speak. ReLife OS gives each person a plan built from a conversation, in their own language, with a human caseworker kept in the loop wherever the system is unsure.",
    architecture: [
      "Five services built with Flask, FastAPI and React + Vite.",
      "An LLM intake interview (Llama 3.1 via Groq) and GPT-4o-mini extraction build a structured profile.",
      "The profile drives a 100-day roadmap with a trust score and mood check-ins.",
      "Low-confidence or unsafe cases go to a caseworker; every override is logged for audit and fairness checks.",
    ],
    contribution: "Solo project.",
    highlights: [
      "AI support chatbot that classifies crisis risk, emotion and intent before replying",
      "Confidence-gated human review with audit logging",
      "Job matching, resume generation, welfare-scheme and NGO matching",
      "Micro-credit eligibility, legal-aid guidance and a Monte Carlo financial simulator",
      "OTP login with JWT and a voice-triggered Telegram SOS",
    ],
    challenges:
      "The hardest part was safety in a sensitive domain: the support chatbot classifies crisis risk, emotion and intent before it answers, and any low-confidence or unsafe case is routed to a caseworker with the override logged. Supporting five Indian languages across five services, and a voice-triggered SOS over Telegram, pushed the architecture toward small, independent services.",
    results: "A working five-service platform covering intake, roadmap, support chat, job and scheme matching, finance simulation and emergency SOS.",
    github: null,
    demo: null,
  },
  {
    slug: "ai-mock-interview",
    name: "AI Mock Interview Platform",
    tagline: "Adaptive technical interviews with agents",
    period: "Nov 2025",
    stack: ["Flask", "CrewAI", "Groq (Llama 3.1)", "MongoDB", "Web Speech API"],
    accent: "lavender",
    art: "dialogue",
    overview:
      "From a student's resume and a job description, six CrewAI agents run a voice-based mock technical interview and write a final report.",
    problem:
      "Students preparing for placements rarely get realistic practice: generic question banks do not match the role, and nobody scores the answers consistently. The platform reads the resume and the job description, interviews the candidate by voice the way a panel would, and hands placement staff comparable scores.",
    architecture: [
      "Six CrewAI agents match skills to the role, ask up to 8 adaptive questions, score each answer on 5 dimensions and write a final report.",
      "Questions adapt to how the candidate answers.",
      "Inflated scores are capped and prompt-injection attempts are blocked.",
      "An admin dashboard shows placement staff scores, a leaderboard and full reports.",
    ],
    contribution: "Solo project.",
    highlights: [
      "Six-agent interview pipeline",
      "Adaptive questioning and 5-dimension scoring",
      "Voice interview in the browser",
      "Admin dashboard for placement staff",
    ],
    challenges:
      "Coordinating six agents so the interview feels like one interviewer, not six, and keeping scores honest: inflated scores are capped and prompt-injection attempts in answers are blocked. Running the whole interview by voice in the browser added latency constraints to every agent turn.",
    results: "A complete voice-driven mock interview flow with adaptive questions, five-dimension scoring and an admin dashboard with a leaderboard and full reports.",
    github: null,
    demo: null,
  },
  {
    slug: "marketing-ai-hub",
    name: "Marketing AI Hub",
    tagline: "Lead scoring and agentic campaigns",
    period: "Oct 2025",
    award: "Hackathon winner",
    stack: ["Flask", "XGBoost", "CrewAI", "Groq", "Twilio"],
    featured: true,
    accent: "gold",
    art: "funnel",
    overview:
      "A 10-module marketing platform with an XGBoost lead-scoring model and a CrewAI campaign generator that sends campaigns by email and SMS.",
    problem:
      "Small marketing teams drown in CRM records and cannot tell which leads deserve attention today. The hub scores every lead, sorts them into hot, warm, cool and cold, and lets agents draft and send campaigns, with a human approving anything risky.",
    architecture: [
      "XGBoost lead-scoring model trained on 5,000 CRM records with engineered engagement and recency features, sorting leads into hot, warm, cool and cold.",
      "CrewAI campaign generator with three agents writes campaigns and sends them by email and SMS (Twilio).",
      "Guarded by prompt-injection checks, per-agent spending caps and human approval for high-risk actions.",
    ],
    contribution: "Solo project.",
    highlights: [
      "XGBoost lead scoring on 5,000 CRM records",
      "Three-agent campaign generation",
      "Email and SMS delivery",
      "Agent guardrails with human approval",
    ],
    challenges:
      "Letting agents send real email and SMS is risky, so the design put guardrails first: prompt-injection checks on every input, per-agent spending caps, and mandatory human approval for high-risk actions. The lead model needed engineered engagement and recency features to separate hot from merely recent leads.",
    results: "Won 1st place at AIM '25, Infynd India National Hackathon (Oct 2025).",
    github: null,
    demo: null,
  },
];

export type Achievement = {
  slug: string;
  kind: "Hackathon" | "Competition" | "Award" | "Speaking";
  title: string;
  // Short name for photo captions
  short: string;
  event: string;
  date: string;
  place?: 1 | 2 | 3;
  // One or two lines of colour: prize, team, format. Only what the photos or resume show.
  detail?: string;
  // Photos in public/wins/. The first one is the cover.
  photos?: string[];
  // Where the cover photo should be anchored when cropped (CSS object-position)
  cover?: string;
};

export const achievements: Achievement[] = [
  {
    slug: "eightfold-iit-delhi", kind: "Hackathon", title: "Winner (1st Place)", short: "Agentic Among Us", event: "Agentic Among Us Hackathon, Eightfold AI & IIT Delhi", date: "Feb 2026", place: 1,
    detail: "₹50,000 prize at Tryst '26, IIT Delhi, as team Duo Verse representing Karpagam College. A two-person team against the field.",
    photos: ["/wins/eightfold-iit-delhi-1.jpg", "/wins/eightfold-iit-delhi-2.jpg", "/wins/eightfold-iit-delhi-3.jpg", "/wins/eightfold-iit-delhi-4.jpg"], cover: "50% 30%",
  },
  {
    slug: "iit-kharagpur", kind: "Hackathon", title: "Winner (1st Place)", short: "National Hackathon", event: "National Hackathon, IIT Kharagpur & Shiv Nadar University", date: "Jan 2026", place: 1,
    detail: "First place and the trophy at a national hackathon run with Shiv Nadar University.",
    photos: ["/wins/iit-kharagpur-1.jpg", "/wins/iit-kharagpur-2.jpg"], cover: "50% 35%",
  },
  {
    slug: "aim-25-infynd", kind: "Hackathon", title: "Winner (1st Place)", short: "AIM '25", event: "AIM '25, Infynd India National Hackathon", date: "Oct 2025", place: 1,
    detail: "36-hour hackathon, ₹25,000 prize, AI Tech Innovators award as team Twin Innovators. Built the Marketing AI Hub here.",
    photos: ["/wins/aim-25-infynd-1.jpg", "/wins/aim-25-infynd-2.jpg"], cover: "50% 40%",
  },
  {
    slug: "hackzilla-kpriet", kind: "Hackathon", title: "Winner (1st Place)", short: "Hackzilla '25", event: "Hackzilla, IEEE Comsoc Society & KPRIET", date: "Sep 2025", place: 1,
    detail: "24-hour hackathon at KPR Institute of Engineering and Technology, hosted by the IEEE Communications Society student branch.",
    photos: ["/wins/hackzilla-kpriet-1.jpg", "/wins/hackzilla-kpriet-2.jpg"], cover: "50% 45%",
  },
  {
    slug: "gravitas-vit", kind: "Hackathon", title: "Top 10 Finalist", short: "Gravitas '25", event: "Gravitas '25, Vellore Institute of Technology", date: "Sep 2025",
    detail: "HackBattle at VIT Vellore. Pitched AR Music Hub on the main stage and finished in the top ten.",
    photos: ["/wins/gravitas-vit-1.jpg", "/wins/gravitas-vit-2.jpg"], cover: "50% 55%",
  },
  {
    slug: "dream11-gameathon", kind: "Competition", title: "Rank 13", short: "Dream11 Gameathon", event: "Dream11 IPL Gameathon 2.0", date: "May 2025",
    detail: "Sports data competition. Team CricTech from KCE finished 13th nationally, among IIT and IIIT teams.",
    photos: ["/wins/dream11-gameathon-1.jpg"], cover: "50% 70%",
  },
  {
    slug: "rd-symposium", kind: "Award", title: "Best Presentation", short: "R&D Symposium", event: "Annual R&D Symposium, Multicoreware & KGISL, Tamil Nadu", date: "Aug 2026",
    detail: "For MachineSpeak, the voice assistant for device health.",
  },
  {
    slug: "bosch-womens-day", kind: "Speaking", title: "Guest Speaker", short: "Bosch Women's Day", event: "Women's Day Celebration, Bosch Global Software Technologies", date: "Mar 2026",
    detail: "Invited to speak at Bosch Global Software Technologies for Women's Day.",
    photos: ["/wins/bosch-womens-day-1.jpg", "/wins/bosch-womens-day-2.jpg"], cover: "50% 35%",
  },
];

/** Achievements shown as photos on the homepage: the four wins, then the talk, then anything else with a photo. */
export const winsGallery = [
  ...achievements.filter((a) => a.place === 1),
  ...achievements.filter((a) => a.place !== 1 && a.kind === "Speaking" && a.photos?.length),
  ...achievements.filter((a) => a.place !== 1 && a.kind !== "Speaking" && a.photos?.length),
];

/** Moments that are not awards: events attended, visits, club life. Shown on the Achievements and Beyond pages. */
export type Moment = { slug: string; title: string; line: string; date: string; photos: string[]; cover?: string };
export const moments: Moment[] = [
  { slug: "google-ai-day", title: "AI Day for Startups", line: "Google for Startups with AIC Raise, Coimbatore. Gemini, Firebase and Google Cloud sessions.", date: "Jul 2025", photos: ["/wins/google-ai-day-1.jpg", "/wins/google-ai-day-2.jpg", "/wins/google-ai-day-3.jpg"] },
  { slug: "tnau-visit", title: "Field visit, TNAU", line: "A day at Tamil Nadu Agricultural University, Coimbatore.", date: "Aug 2025", photos: ["/wins/tnau-visit-1.jpg", "/wins/tnau-visit-2.jpg"], cover: "50% 40%" },
  { slug: "rotaract", title: "Rotaract Club", line: "Editor, then DPP Chair, at Karpagam College of Engineering.", date: "2023 - 2025", photos: ["/wins/rotaract-1.jpg"], cover: "50% 30%" },
];

export const education = {
  school: "Karpagam College of Engineering",
  degree: "B.Tech, Artificial Intelligence & Data Science",
  university: "Anna University, Coimbatore",
  period: "2023 - 2027",
  cgpa: "8.9 / 10.0 (till semester VI)",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Cloud & DevOps", items: ["Microsoft Azure", "AWS", "Google Cloud (GCP)", "Azure VMs", "Azure Container Apps", "AKS", "ACR", "GKE", "AWS IAM & STS", "AWS SDK", "Azure REST APIs", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "AWS CodeBuild", "Azure Lighthouse", "ARM Templates", "CloudFormation", "Azure CLI", "AWS CLI", "Git"] },
  { group: "Monitoring & Automation", items: ["Prometheus", "Grafana", "CI/CD", "Infrastructure as Code (IaC)", "Containerization", "RBAC", "Monitoring & Observability", "Database Migrations"] },
  { group: "Generative AI", items: ["MCP", "MCP Gateways", "Multi-Agentic Systems", "CrewAI", "Groq", "LLM Guardrails", "RAG", "LangChain", "Transformers (HuggingFace)", "FAISS", "Vector Databases", "Whisper ASR", "LoRA", "PEFT", "SLM"] },
  { group: "AI & Machine Learning", items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "YOLOv8", "OpenCV", "Keras", "SHAP", "LIME", "Matplotlib", "Power BI", "Tableau"] },
  { group: "Programming", items: ["Python", "Go", "Java", "SQL", "JavaScript", "TypeScript", "Node.js", "HTML/CSS", "React"] },
  { group: "Backend & Databases", items: ["FastAPI", "Flask", "Express", "Echo", "WebSockets", "asyncio", "REST APIs", "MongoDB", "PostgreSQL", "Elasticsearch", "Redis", "Kafka", "Airbyte", "Weaviate", "LiveKit"] },
];

// Short list for the hero marquee.
export const marqueeSkills = [
  "Azure", "AWS", "GCP", "Kubernetes", "Terraform", "Go", "Python", "TypeScript", "React", "Node.js", "MongoDB", "PostgreSQL",
  "Kafka", "Redis", "Jenkins", "Prometheus", "Grafana", "MCP", "CrewAI", "LangChain", "RAG", "PyTorch", "XGBoost", "Whisper",
];

export const beyond = {
  leadership: [
    { title: "Editor (2023 - 2024) and DPP Chair (2024 - 2025)", org: "Rotaract Club, Karpagam College of Engineering" },
    { title: "Event organizer", org: "Organized and led multiple college events, managing planning, coordination and execution" },
  ],
  speaking: "Guest Speaker at the Women's Day Celebration, Bosch Global Software Technologies (Mar 2026).",
  personal:
    "Outside the codebase I like being the person others can ask. At Adya I support student scholars with DevOps, cloud and LLM problems; at college I spent two years with the Rotaract Club, first as Editor and then as DPP Chair, organising events from the first plan to the last chair being stacked. Hackathons are my favourite weekend format: a hard problem, a small team and a deadline.",
};

export const about = {
  journey:
    "I started in AI and Data Science at Karpagam College of Engineering in 2023, and found early on that I enjoyed the part after the model works: getting it to run somewhere real. Hackathons became the way I learned fastest, and four first-place wins later the projects had grown from scripts into multi-service platforms with agents, guardrails and real users. An AI internship at Infosys Springboard put LLMs in front of financial data. Then at Adya AI the two threads met: I build agentic product features by day and own the company's infrastructure across Azure, AWS and GCP, from VMs to four production clusters.",
  philosophy:
    "A system is not finished when it works on my laptop. It is finished when it is deployed, observed and safe to leave running. So I reach for monitoring before features, I treat agent actions as something a human should be able to approve or roll back, and I prefer small, honest guardrails over clever prompts. I like to understand a stack from the API call to the container to the cluster, because that is where most real problems live.",
  workAreas: ["Agentic AI and MCP", "Cloud infrastructure and DevOps", "Voice interfaces", "Applied machine learning"],
};

export const isPlaceholder = (s: string) => s.startsWith(PLACEHOLDER);
