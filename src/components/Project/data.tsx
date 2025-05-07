import { Image } from "@chakra-ui/react";
import SHELVED from "/shelved.png"
import { FaBookOpen, FaRobot, FaServer, FaTerminal } from "react-icons/fa";
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
  {
    name: 'Concurrent FTP UDP Server',
    icon: FaServer,
    githubUrl: 'https://github.com/satwikShresth/FileTransferProtocol',
    techStack: ['C++', 'UDP', 'POSIX Threads', 'Make'],
    description: [
      'Thread pool architecture for handling multiple client connections',
      'Custom channel-based communication for efficient data distribution',
      'Thread-safe concurrent file operations',
    ],
  },
  {
    name: 'Path Finding Visualizer',
    icon: FaRobot,
    githubUrl: 'https://github.com/satwikShresth/PathFinding_Cpp',
    techStack: ['SFML', 'CMake', 'C++'],
    description: [
      "Interactive visualization of A* and Dijkstra's algorithms",
      "Dynamic maze generation with Kruskal's algorithm",
    ],
  },
  {
    name: 'NeoVim Configuration',
    icon: FaTerminal,
    githubUrl: 'https://github.com/satwikShresth/.config/tree/main/nvim',
    techStack: [
      'Ghostty',
      'Lua',
      'Neovim',
      'Bash',
      'tmux',
      'jq',
      'fzf',
      'ripgrep',
    ],
    description: [
      'VSCode-level functionality with <50ms load time',
      'Integrated terminal workflow with tmux and telescope',
      'Complete LSP setup with auto-completion and diagnostics',
    ],
  },
];
