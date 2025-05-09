import { Image } from "@chakra-ui/react";
import SHELVED from "/shelved.png"
import { FaBookOpen } from "react-icons/fa";
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
    name: 'Shelved',
    image: <Image src={SHELVED} />,
    liveUrl: 'https://shelved.satwik.dev',
    githubUrl: 'https://github.com/satwikShresth/shelved',
    techStack: [
      'Docker',
      'Deno',
      'Express.js',
      'JavaScript',
      'Knex.js',
      'Node.js',
      'Postgres',
    ],
    description: [
      'Full-stack app for tracking and reviewing media content with social features',
      'Robust authentication, rate-limiting and LRU Cache implementation',
      'Integration of multiple API data sources',
    ],
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
    ],
    description: [
      'Fully typed book management system with complete CRUD operations',
      'Security-focused with protection against XSS and CSRF attacks',
      'Containerized deployment via Docker Compose',
    ],
  },
];
