import { Box, Image } from "@chakra-ui/react";
import SHELVED from "/shelved.png"
import INSP from '/inspiraiton.png';
import OM from "/openmario.png"
import { FaBookOpen, FaCode } from "react-icons/fa";
import type { ReactNode } from "@tanstack/react-router";

export interface Projects {
  name: string;
  image?: ReactNode;
  icon?: ReactNode;
  liveUrl?: string;
  githubUrl: string;
  techStack: Array<string>;
  description: Array<string>;
}

export const projects: Array<Projects> = [
  {
    name: 'OpenMario',
    image: <Image src={OM} />,
    liveUrl: 'https://www.openmario.com',
    githubUrl: 'https://github.com/satwikShresth/OpenMario',
    techStack: [
      'Docker',
      'Node.js',
      'React.js',
      'TanStack Query',
      'Meilisearch',
      'Postgres',
      'Python'
    ].sort(),
    description: [
      'Open-source platform for Drexel students to search job listings, courses, and professor ratings in one place',
      'Scraped and transformed 50K+ webpages of raw data into a structured schema optimized for cross-reference features',
      'Implemented millisecond-latency search using Meilisearch with zero user data storage for privacy and performance',
      'Achieved early product validation with 100+ weekly active users and 220+ wage submissions without marketing'
    ]
  },
  {
    name: 'Inspiration',
    image: (
      <Box
        bgColor={"white"}
        position="relative"
        borderRadius={"lg"}
      >
        <Image src={INSP} position="relative" />
      </Box>
    ),
    liveUrl: 'https://inspiration.cci.drexel.edu',
    githubUrl: 'https://gitlab.cci.drexel.edu/inspiration',
    techStack: [
      'Docker',
      'React',
      'TanStack',
      'S3',
      'Celery',
      'Redis',
      'Postgres',
      'Python',
      'Playwright',
      'Rust'
    ].sort(),
    description: [
      'Led 5-student team to build privacy-focused plagiarism detection system designed to replace MOSS at Drexel University',
      'Implemented Celery work-queues to balance workload, delivering results 10x faster with improving user experience',
      'Developed Rust extensions for Python, speeding up computation-heavy algorithms by 2x',
      'Designed self-managed S3 infrastructure for granular permissions and optimized streaming reducing backend load',
      'Designed graph-like relational database schema optimized for interactive visualizations',
      'Completely rewrote Docker configuration and orchestrated Caddy server setup for improved performance and security',
    ]
  },
  {
    name: 'Shelved',
    image: <Image src={SHELVED} />,
    liveUrl: 'https://shelved.satwik.dev',
    githubUrl: 'https://github.com/satwikShresth/shelved',
    techStack: [
      'Docker',
      'Node.js',
      'Knex.js',
      'Postgres',
      'JavaScript',
      'EJS'
    ].sort(),
    description: [
      'Led a team of 4 to design, implement and self-host a full-scale books and media tracking website using just JavaScript',
      'Built custom authentication with JsonWebToken, secure password hashing, and anti-bot measures to ensure platform security',
      'Integrated multiple APIs, normalizing data to support social features like sharing, following, review and ratings',
      'Developed LRU caching that reduced API-dependent page load times by 65% and improved overall site responsiveness'
    ]
  },
  {
    name: 'Personal Website',
    icon: FaCode,
    liveUrl: 'https://satwik.dev',
    githubUrl: 'https://github.com/satwikShresth/satwik.dev',
    techStack: [
      'TypeScript',
      'React.js',
      'Next.js',
      'TanStack Query',
      'Chakra UI',
      'CI/CD',
      'GitHub Actions'
    ].sort(),
    description: [
      'Personal portfolio website showcasing projects, skills, and experiences',
      'Responsive design with accessibility features and dark/light mode support',
      'Automated deployment using GitHub Actions CI/CD pipeline'
    ]
  },
  {
    name: 'Library',
    icon: FaBookOpen,
    liveUrl: 'https://cs478.satwik.dev',
    githubUrl: 'https://github.com/satwikShresth/Library',
    techStack: [
      'Docker',
      'Drizzle ORM',
      'TanStack Query',
      'Express.js',
      'JsonWebToken',
      'React.js',
      'SQLite',
      'Zod',
    ].sort(),
    description: [
      'Fully typed book management system with complete CRUD operations',
      'Security-focused with protection against XSS and CSRF attacks',
      'Containerized deployment via Docker Compose',
    ],
  },
];
