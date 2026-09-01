import type { TeamMember } from '../types';
import felixImage from '../assets/team/Felix.png';
import samuelImage from '../assets/team/Samuel.jpg';
import tenerifaImage from '../assets/team/Tenerifa.jpg';
import goodnewsImage from '../assets/team/Goodnews.jpg';  
import estherImage from '../assets/team/Esther.jpg';

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'alex-chen',
    name: 'Awajiikatelem Felix',
    role: 'Founder & Chief Executive Officer | Full-Stack Software Architect',
    bio: 'Full-stack software architect and youth technology lead passionate about building scalable digital products and solving real-world problems through technology. Recognized as the individual winner of Best in Backend Development at the Bonny Digital Literacy Initiative Award 2026.',
    expertise: ['Full-Stack Development · Backend Engineering · Software Architecture · APIs · Databases · Cloud & DevOps · System Design'],
    image: felixImage,
    github: 'https://github.com/awajiikatelem',
    email: 'mailto:awajiikatelemfelix@gmail.com',
    twitter: 'https://x.com/felixcodes001',
    quote: 'We started PioneerX Labs this year with 5 hyper-focused innovators to build technology that makes a real impact.'
  },
  {
    id: 'maya-patel',
    name: 'Samuel Brown',
    role: 'Co-Founder & Chief Technology Officer | Robotics Engineer',
    bio: 'Robotics and AI engineer focused on building intelligent systems, automation, and practical software solutions that merge technology with real-world impact.',
    expertise: ['Robotics Engineering' , 'Full-Stack Development', 'AI / Machine Learning', 'Python', 'FastAPI', 'Vector Databases', 'Computer Vision', 'Automation & Embedded Systems'],
    image: samuelImage,
    github: 'https://github.com/Samuel16-Sokari-Brown',
    linkedin: 'https://linkedin.com/in/samuel-brown-sokari-539331427',
    email: 'mailto:sammybryan21200915@gmail.com',
    quote: 'Building zero-latency software architecture is our daily standard. Engineering intelligent systems where software, AI, and robotics meet.'
  },
  {
    id: 'liam-vance',
    name: 'Tenerifa Igwe',
    role: 'Research & Documentation Lead | Product Designer',
    bio: 'Research-driven designer and storyteller who turns ideas into clear solutions through documentation, product thinking, and impactful presentation.',
    expertise: ['Research & Analysis', 'Documentation & Technical Writing', 'Pitch Deck Development', 'UI/UX Design Systems'],
    image: tenerifaImage,
    email: 'mailto:igwetenerifa@gmail.com',
    quote: 'Turning research and ideas into meaningful products that create real-world impact.'
  },
  {
    id: 'sophia-rossi',
    name: 'Goodnews Uwem',
    role: 'Full-Stack Developer | AI Engineer',
    bio: 'Full-stack developer and AI enthusiast building intelligent web systems, APIs, and practical solutions that solve everyday problems with scalable technology.',
    expertise: [
      'Full-Stack Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Web Development',
      'Backend Development',
      'API Integration',
      'Database Management',
      'Problem Solving'
    ],
    image: goodnewsImage,
    github: 'https://github.com/uwemg098-lang',
    email: 'mailto:goodnewsuwem@gmail.com',
    twitter: 'https://twitter.com',
    quote: 'Scalable infrastructure begins with clean, type-safe configurations.'
  },
  {
    id: 'devon-kim',
    name: 'Esther Livinus',
    role: 'Research & Documentation Specialist',
    bio: 'Detail-oriented researcher passionate about documentation, collaboration, and turning ideas into clear, meaningful solutions.',
    expertise: [
      'Research & Analysis',
      'Frontend Development',
      'Documentation',
      'Technical Writing',
      'Content Development',
      'Data Collection',
      'Presentation',
      'Project Coordination',
      'Communication'
    ],
    image: estherImage,
    github: 'https://github.com/Esther05-cloud',
    linkedin: 'https://linkedin.com/in/esther-livinus-05bb8a354',
    email: 'mailto:livinusesther92@gmail.com',
    quote: 'Delivering native-level speed and intuitive user flows.'
  }
];
