import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-dev',
    icon: 'Globe',
    title: 'Custom Web Development',
    shortDesc: 'Ultra-fast, responsive web applications engineered with Next.js, React, and modern micro-frontends.',
    fullDesc: 'We craft web applications designed for scale, maximum speed, and flawless user experiences. From complex enterprise SaaS dashboards to interactive brand platforms, our clean architecture ensures 99+ Lighthouse performance, SEO dominance, and high conversion.',
    deliverables: [
      'Responsive Single Page & Multi-Page Apps',
      'Headless CMS & API Integration',
      'State-of-the-Art Design System Implementation',
      'Performance Optimization & PWA Support'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'GraphQL'],
    estimatedDays: '14 - 30 Days'
  },
  {
    id: 'mobile-dev',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    shortDesc: 'Native iOS & Android experiences crafted for fluid 120Hz performance and deep hardware access.',
    fullDesc: 'Build high-performance mobile applications that users love. Utilizing React Native and Flutter, we deliver cross-platform apps with native speed, biometric security, real-time push notifications, and offline sync capability.',
    deliverables: [
      'Cross-Platform iOS & Android Apps',
      'Offline-First Data Synchronization',
      'App Store & Google Play Publishing',
      'Real-Time WebSocket & Push Notifications'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Supabase'],
    estimatedDays: '21 - 45 Days'
  },
  {
    id: 'ui-ux',
    icon: 'Palette',
    title: 'UI/UX & Product Design',
    shortDesc: 'Human-centered interfaces, rich micro-interactions, and scalable design systems that inspire.',
    fullDesc: 'Transform complex user flows into intuitive, visually breathtaking digital products. Inspired by Apple, Vercel, and Linear, our design language blends modern glassmorphism, micro-animations, accessible color contrasts, and ergonomic layout hierarchies.',
    deliverables: [
      'Figma Interactive Design Systems & UI Kits',
      'User Research & Wireframing',
      'Interactive Micro-Animations & Prototypes',
      'Design Tokens & Developer Handoff'
    ],
    technologies: ['Figma', 'Framer', 'Spline 3D', 'Lottie', 'Storybook', 'Tailwind tokens'],
    estimatedDays: '10 - 20 Days'
  },
  {
    id: 'ai-solutions',
    icon: 'Sparkles',
    title: 'AI Solutions & LLM Integration',
    shortDesc: 'Custom AI agents, RAG engines, vector search pipelines, and predictive machine learning models.',
    fullDesc: 'Empower your business with cutting-edge artificial intelligence. We build custom RAG pipelines, fine-tuned domain LLMs, autonomous agent workflows, and computer vision models that automate complex tasks and surface deep intelligence.',
    deliverables: [
      'Custom LLM Fine-Tuning & Prompt Pipelines',
      'RAG Engine & Vector Database Search',
      'Autonomous Business AI Agents',
      'Computer Vision & Predictive Analytics'
    ],
    technologies: ['Python', 'PyTorch', 'LangChain', 'Pinecone', 'OpenAI', 'Hugging Face'],
    estimatedDays: '14 - 40 Days'
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: 'Data Analytics & Infrastructure',
    shortDesc: 'Real-time telemetry pipelines, interactive BI dashboards, and data warehouse architecture.',
    fullDesc: 'Turn raw telemetry into action. We engineer robust ETL pipelines, real-time streaming architectures, and executive BI dashboards that give teams immediate visibility into key operational metrics and customer behavior.',
    deliverables: [
      'Real-Time Streaming Pipelines (Kafka / ClickHouse)',
      'Executive Dashboards & Custom Data Visualizations',
      'Data Warehouse Modeling & ETL Automation',
      'Predictive Churn & Revenue Analytics'
    ],
    technologies: ['ClickHouse', 'PostgreSQL', 'Python', 'Apache Kafka', 'Grafana', 'Tableau'],
    estimatedDays: '14 - 30 Days'
  },
  {
    id: 'consulting',
    icon: 'ShieldCheck',
    title: 'Software Architecture & Consulting',
    shortDesc: 'Codebase audits, cloud security hardening, scale bottlenecks resolution, and tech stack modernization.',
    fullDesc: 'Have an existing codebase suffering from slow load times or security technical debt? Our senior youth engineers perform deep architectural audits, stress testing, refactoring roadmaps, and cloud infrastructure optimizations.',
    deliverables: [
      'Comprehensive Code Audit & Security Assessment',
      'Cloud Architecture Blueprint & Cost Reduction',
      'CI/CD Pipeline Setup & Infrastructure as Code',
      'DevOps Automation & Kubernetes Orchestration'
    ],
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    estimatedDays: '7 - 14 Days'
  },
  {
    id: 'digital-transformation',
    icon: 'Zap',
    title: 'Digital Transformation & Cloud',
    shortDesc: 'Modernizing legacy workflows into cloud-native microservices and seamless automated pipelines.',
    fullDesc: 'Guide your organization into the modern tech era. We replace manual spreadsheets and legacy software with cloud-native web portals, automated business workflows, and API-driven integrations.',
    deliverables: [
      'Legacy System Migration to Cloud',
      'Automated Workflow Pipelines (n8n / custom webhooks)',
      'API Ecosystem & Integration Bridge',
      'Staff Training & Technical Documentation'
    ],
    technologies: ['Cloudflare', 'AWS Lambda', 'Node.js', 'Docker', 'REST/GraphQL', 'Redis'],
    estimatedDays: '20 - 40 Days'
  }
];
