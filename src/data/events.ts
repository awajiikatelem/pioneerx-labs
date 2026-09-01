import { EventItem } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'pioneer-hackathon-2026',
    title: 'PioneerX Global Youth Hackathon 2026',
    subtitle: '48-Hour virtual hackathon competing for $25,000 in cash prizes & incubation grants.',
    type: 'Hackathon',
    date: 'September 18-20, 2026',
    time: '09:00 AM EST (48 Hours)',
    location: 'Virtual / Discord & PioneerX Live Stream',
    speakerOrHost: 'Hosted by PioneerX Labs Founders & Guest Mentors',
    description: 'Join over 1,500 young developers, designers, and AI creators worldwide. Build game-changing open-source prototypes using WebGPU, AI agent swarms, and high-performance cloud tools.',
    status: 'Upcoming',
    registrationOpen: true
  },
  {
    id: 'ai-edge-webinar',
    title: 'Masterclass: Deploying LLMs on the Edge with WebGPU',
    subtitle: 'Live technical deep dive and hands-on live coding workshop.',
    type: 'Tech Webinar',
    date: 'August 28, 2026',
    time: '02:00 PM EST',
    location: 'Interactive Zoom & YouTube Live',
    speakerOrHost: 'Maya Patel (CTO, PioneerX Labs)',
    description: 'Learn how to quantize models, manage browser VRAM buffers, and build zero-latency web applications powered by local AI intelligence.',
    status: 'Upcoming',
    registrationOpen: true
  },
  {
    id: 'product-aura-launch',
    title: 'Aura AI Engine 2.0 Product Keynote',
    subtitle: 'Unveiling the next era of private enterprise AI orchestration.',
    type: 'Product Launch',
    date: 'July 10, 2026',
    time: '11:00 AM EST',
    location: 'PioneerX Virtual Keynote Stage',
    speakerOrHost: 'Alex Chen & Product Team',
    description: 'Keynote presentation demonstrating Aura AI Engine 2.0 featuring custom RAG vector streaming, multi-modal vision parsing, and 1-click Docker deployment.',
    status: 'Past',
    registrationOpen: false
  }
];
