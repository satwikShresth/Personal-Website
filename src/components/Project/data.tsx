import { Box, Image, Link, Text } from "@chakra-ui/react";
import SHELVED from "/shelved.png"
import INSP from '/inspiraiton.png';
import OM from "/openmario.png"
import { FaBookOpen, FaCode } from "react-icons/fa";
import * as openmario from "./data/openmario"
import * as inspiration from "./data/inspiration"
import type { ReactNode } from "@tanstack/react-router";
import type { ReactElement } from "react";


export interface Projects {
  name?: ReactElement;
  image?: ReactNode;
  icon?: ReactNode;
  liveUrl?: string;
  githubUrl: string;
  techStack: Array<string>;
  description: Array<ReactElement>;
}

export const projects: Array<Projects> = [
  {
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
      <>Open-source platform for Drexel students to search job listings, courses, and professor ratings in one place</>,
      <>
        200+ weekly active users and 220+ wage submissions, without any marketing, just word of mouth and a <Link
          color={"accent"}
          href="https://www.reddit.com/r/Drexel/comments/1jsa5tj/i_made_the_drexel_term_master_we_deserve/" style={{ textDecoration: 'underline' }}
        >Reddit post</Link>
      </>,
      <>Hosted on my personal VPS</>,
    ],
    ...openmario
  },
  {
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
      <>FERPA-compliant open-source plagiarism detection software developed for Drexel University, enabling self-hosted and privacy-focused implementation</>,
      <>Incorporates multi-modal detection techniques based on Stanford research papers with enhanced visualization for software similarity analysis</>
    ],
    ...inspiration
  },
  {
    name: <Text color={"accent"} fontSize={"2xl"} mb={2}>Shelved</Text>,
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
      <>A simple group project where the goal was to master JavaScript as a raw language and build applications and features from scratch</>,
      <>The learning outcome was a deeper understanding of CSS, JavaScript, server‑side rendering, and DOM manipulation</>,
      <>Built entirely on Deno without any bundling</>,
      <>Used EJS to render web pages</>,
      <>Employed a strategy pattern to integrate multiple content APIs and normalize their outputs into a unified format</>,
      <>Implemented social features including friends, following, discovery, public collections, and private connections</>,
      <>Utilized PostgreSQL for the database</>,
    ]
  },
  {
    name: <Text color={"accent"} fontSize={"2xl"} mb={2}>Personal Website</Text>,
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
      <>A 100% client‑side playground for digging through my half‑baked blogs via full‑text or tag searches</>,
      <>Born as therapy for my runaway hot takes—so I can’t lose my own brilliant (and not‑so‑brilliant) ideas</>,
      <>No courses, no paywalls—just unfiltered opinions and unsolicited wisdom</>,
      <>Also doubles as a humble shrine to my ramblings and occasional flashes of genius</>,
    ]
  },
  {
    name: <Text color={"accent"} fontSize={"2xl"} mb={2}>Library</Text>,
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
      <>A humble assignment I actually hosted—so now it’s your problem to check it out.</>,
      <>Fully typed in TypeScript and neatly structured for posterity.</>,
      <>My very first React app—a quaint benchmark against what I’m building today.</>,
      <>No bells, no whistles: just raw, typed React goodness.</>,
    ],
  },
];
