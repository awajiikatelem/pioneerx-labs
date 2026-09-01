import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'aura-ai',
    name: 'Aura AI Engine',
    tagline: 'Private AI infrastructure designed for secure, high-performance enterprise workflows',
    description: 'Aura AI gives teams a controlled environment for deploying domain-specific language models in private infrastructure, keeping sensitive data protected while improving speed and operational consistency.',
    icon: 'Cpu',
    badge: 'Flagship Platform',
    metrics: [
      { label: 'Response Time', value: '180 tok/s' },
      { label: 'Data Control', value: 'Private Deployment' },
      { label: 'Delivery', value: 'Docker / K8s Ready' }
    ],
    features: [
      'Self-hosted retrieval and indexing workflows',
      'Efficient model deployment with lightweight inference',
      'Built-in governance and safety controls',
      'Secure API access for internal systems and apps'
    ],
    status: 'Live GA',
    demoUrl: '#product-aura'
  },
  {
    id: 'devsync-flow',
    name: 'DevSync Workspace',
    tagline: 'A focused collaboration platform for product, design, and engineering teams',
    description: 'DevSync connects planning, design, and implementation in one workspace so teams can move from concept to delivery with clearer coordination and fewer handoff gaps.',
    icon: 'Layers',
    badge: 'Operational Tool',
    metrics: [
      { label: 'Sync Speed', value: '< 15ms' },
      { label: 'Tool Integration', value: 'Figma + GitHub' },
      { label: 'Team Adoption', value: '340+' }
    ],
    features: [
      'Collaborative architecture and planning boards',
      'Live issue and requirement synchronization',
      'Structured user story and workflow generation',
      'Shared team communication and review spaces'
    ],
    status: 'Live GA',
    demoUrl: '#product-devsync'
  },
  {
    id: 'flowscale-cloud',
    name: 'FlowScale Pipeline',
    tagline: 'Deployment automation for faster, more reliable multi-cloud delivery',
    description: 'FlowScale reduces deployment friction across cloud environments by automating testing, preview creation, rollback, and release coordination with greater consistency and visibility.',
    icon: 'Zap',
    badge: 'Release Product',
    metrics: [
      { label: 'Build Speed', value: '3.4x Faster' },
      { label: 'Reliability', value: 'Zero-Downtime Strategy' },
      { label: 'Cost Efficiency', value: '40% Lower Spend' }
    ],
    features: [
      'Instant preview environments for each release',
      'Multi-cloud orchestration with release controls',
      'Continuous validation and visual regression checks',
      'Performance monitoring and budget-aware scaling'
    ],
    status: 'Beta',
    demoUrl: '#product-flowscale'
  }
];
