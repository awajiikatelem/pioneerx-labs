import { BlogPost } from '../types';
import felixImage from '../assets/team/Felix.png';
import samuelImage from '../assets/team/Samuel.jpg';
import tenerifaImage from '../assets/team/Tenerifa.jpg';
import farmImage from '../assets/team/farm.PNG';
import ecosafeImage from '../assets/team/ecosafe.png';
import dashboardImage from '../assets/team/dashboard.PNG';


export const BLOG_DATA: BlogPost[] = [
  {
    id: 'ecosafe-community-response-platform',
    title: 'EcoSafe: A real environmental reporting platform for communities',
    summary: 'How PioneerX Labs designed and launched a practical hazard-reporting system for communities to report environmental risks and respond faster.',
    content: `
# EcoSafe: A real environmental reporting platform for communities

EcoSafe is a live project from PioneerX Labs built to help communities report environmental issues, detect risk patterns, and connect those reports to faster action.

## Why the product matters

The project was created around a simple reality: environmental hazards often reach communities before they reach the right response channels. EcoSafe gives residents a direct way to report problems such as flooding, blocked drainage, waste dumping, fire outbreaks, and water contamination.

## What the platform does

The product combines reporting, location-aware incident capture, and a dashboard for oversight. This makes it easier for citizens to submit a report and for local authorities or administrators to review, prioritize, and respond more effectively.

## The real build behind it

The PioneerX Labs team designed the app around community action rather than abstract AI features. The goal was not just to add automation, but to create a simple, useful system that people can trust and understand in urgent situations.

The project is live on Vercel and the code is publicly available on GitHub, so the work can be reviewed, reused, and improved by others.
    `,
    author: {
      name: 'Awajiikatelem Felix',
      role: 'Founder & CEO',
      avatar: felixImage
    },
    category: 'Case Study',
    date: 'August 11, 2026',
    readTime: '4 min read',
    image: ecosafeImage,
    url: 'https://ecosafe-ai-bg1f.vercel.app/',
    tags: ['EcoSafe', 'Community Tech', 'Environmental Reporting', 'Live Product']
  },
  {
    id: 'pioneerx-building-clinical-dashboard-systems',
    title: 'Building a clean operational dashboard for community safety and response',
    summary: 'A look at how we designed a monitoring dashboard for hazard oversight, real-time visibility, and clearer decision-making.',
    content: `
# Building a clean operational dashboard for community safety and response

A strong dashboard is not just a visual layer over data. It is the operational nerve center that turns fragmented reports into useful decisions.

## The main challenge

When a platform is designed for community safety, the dashboard must support quick scanning, clear prioritization, and confidence in the information being surfaced. It cannot overload the user with noise.

## Our approach

At PioneerX Labs, we focused on a clean UI that helps teams quickly understand what matters most: hazard activity, location-based issues, and response conditions. We kept the layout readable, focused, and actionable so operational decisions can happen faster.

## Why it matters

The lesson is simple: when a report system is built for real-world operations, the dashboard must reflect that urgency. The interface should feel clear enough to help people act, not just admire the product.

This design direction is part of the EcoSafe platform and reflects the way the team balances product clarity with social impact.
    `,
    author: {
      name: 'Samuel Brown',
      role: 'Co-Founder & CTO',
      avatar: samuelImage
    },
    category: 'AI & Engineering',
    date: 'August 9, 2026',
    readTime: '5 min read',
    image: dashboardImage,
    url: 'https://github.com/awajiikatelem/Ecosafe-AI',
    tags: ['Dashboard', 'UX Design', 'Operations', 'Hazard Monitoring']
  },
  {
    id: 'smart-poultry-farm-operations',
    title: 'Building smarter poultry farm operations through better records and daily decisions',
    summary: 'A practical look at how farm data, flock monitoring, and structured daily routines can improve poultry productivity and animal care.',
    content: `
# Building smarter poultry farm operations through better records and daily decisions

Poultry farming depends on consistency. Feed, flock health, housing conditions, and daily observation all affect how well the farm performs over time.

## Why record-keeping matters

When operations are run without good records, small problems become expensive problems. Delayed feed monitoring, inconsistent health checks, and missing documentation can all lower efficiency and create avoidable losses.

## The value of a clear routine

A better system starts with simple daily habits: tracking feed usage, noting bird behavior, reviewing flock health, and recording important changes. When these are organized clearly, farm managers can respond faster and make better decisions.

## Why this connects to product thinking

At PioneerX Labs, we believe that useful technology should support real work rather than complicate it. A poultry operation needs tools that are practical, understandable, and built around everyday routines.

That is the mindset behind building systems that help families and farm businesses run more smoothly, with more structure and better visibility.
    `,
    author: {
      name: 'Tenerifa Igwe',
      role: 'Research & Documentation Lead',
      avatar: tenerifaImage
    },
    category: 'Case Study',
    date: 'August 3, 2026',
    readTime: '4 min read',
    image: farmImage,
    url: 'https://ecosafe-ai-bg1f.vercel.app/',
    tags: ['Poultry', 'Farm Management', 'Agriculture', 'Operations']
  }
];
