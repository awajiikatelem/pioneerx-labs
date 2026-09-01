import type { Project } from '../types';
import ecosafeImage from '../assets/team/ecosafe.png';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pioneerx-flagship-platform',
    title: 'EcoSafe',
    tagline: 'A community-focused environmental reporting and response platform',
    category: 'AI & ML',
    client: 'Community Sustainability Initiative',
    description: 'EcoSafe is a smart community platform built to help residents report environmental issues, monitor water conditions, and respond quickly to local challenges.',
    fullDetails: 'EcoSafe was developed by the PioneerX Labs team to make environmental reporting easier and more actionable for communities. The platform brings together reporting tools, real-time insights, and a clear operational dashboard for community-focused decision making.',
    impactMetrics: [
      { label: 'Issue Tracking', value: 'Live' },
      { label: 'Community Reach', value: 'Local' },
      { label: 'Focus Area', value: 'Environment' },
      { label: 'Launch Year', value: '2026' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    image: ecosafeImage,
    demoUrl: 'https://ecosafe-ai-bg1f.vercel.app/',
    githubUrl: 'https://github.com/awajiikatelem/Ecosafe-AI',
    featured: true
  }
];
