import { CareerRole } from '../types';

export const CAREERS_DATA: CareerRole[] = [
  {
    id: 'senior-fullstack-engineer',
    title: 'Senior Full-Stack Engineer (React / TypeScript / Node)',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'We are seeking an ambitious full-stack engineer who thrives in high-speed product cycles. You will design sub-second web applications, real-time dashboards, and robust API microservices.',
    requirements: [
      '3+ years experience with React, Next.js, TypeScript, and TailwindCSS',
      'Proven expertise in state management, WebSockets, and performance profiling',
      'Strong grasp of clean architecture, CI/CD pipelines, and cloud services (AWS/Vercel/Supabase)',
      'Passion for elegant UI aesthetics and developer experience'
    ],
    responsibilities: [
      'Architect and build customer-facing web applications with 99+ Lighthouse performance',
      'Collaborate with UI/UX designers to translate Figma tokens into modular React code',
      'Mentor junior fellowship developers and conduct thorough code reviews',
      'Optimize API request pipelines and database queries for maximum throughput'
    ],
    perks: [
      'Competitive global compensation & equity options',
      '$2,500 home office workstation stipend (MacBook M3/M4 Max)',
      'Flexible working hours & unlimited PTO policy',
      'Annual tech conference travel grant & continuous learning fund'
    ]
  },
  {
    id: 'ai-research-engineer',
    title: 'AI / Machine Learning Systems Engineer',
    department: 'AI / Data',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Join our core AI squad building high-performance RAG pipelines, fine-tuned domain LLMs, and edge quantization engines for enterprise clients.',
    requirements: [
      'Deep proficiency with Python, PyTorch, LangChain, Transformers, and CUDA',
      'Experience with vector databases (Pinecone, Qdrant, ChromaDB) and quantization techniques',
      'Understanding of WebGPU or C++ bindings for local model acceleration is a huge plus',
      'Demonstrated track record of shipping ML models into production environments'
    ],
    responsibilities: [
      'Fine-tune domain LLMs and build high-precision vector retrieval pipelines',
      'Benchmarking model latency, VRAM footprint, and inference speeds',
      'Design autonomous agent swarms capable of complex multi-step reasoning',
      'Publish research whitepapers and open-source benchmarks'
    ],
    perks: [
      'Dedicated GPU cluster compute credits (Nvidia H100/A100 access)',
      'Global remote freedom with flexible core hours',
      'Generous learning budget for AI research papers and events'
    ]
  },
  {
    id: 'youth-tech-fellowship',
    title: 'PioneerX Youth Developer Fellowship (Fall 2026)',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Fellowship / Internship',
    description: 'A paid 12-week immersive program for exceptionally talented young programmers (ages 16–23) to pair program with senior architects and build real client software.',
    requirements: [
      'Strong foundational proficiency in JavaScript/TypeScript, Python, or Rust',
      'Portfolio of personal projects or active GitHub contributions',
      'Unstoppable curiosity, problem-solving passion, and desire to ship real software',
      'Available 20–30 hours per week during the fellowship duration'
    ],
    responsibilities: [
      'Pair program directly with PioneerX founders and tech leads on live projects',
      'Contribute to PioneerX open-source products and client features',
      'Participate in weekly engineering masterclasses and architecture teardowns',
      'Present a capstone project during the PioneerX Demo Day'
    ],
    perks: [
      'Paid competitive fellowship stipend',
      'Direct 1-on-1 executive mentorship from industry founders',
      'Fast-track offer for full-time junior engineer position upon completion',
      'Full PioneerX developer swag pack & gear'
    ]
  }
];
