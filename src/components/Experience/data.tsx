import { Image } from "@chakra-ui/react";
import SIG from '/sig.jpg';
import OPEX from '/opex.png';
import DREXEL from '/drexel.png';

export const experiences = [
  {
    company: 'Drexel University',
    location: 'Philadelphia, PA',
    position: 'Lead Software Engineer',
    team: 'Inspiration, College of Computing & Informatics',
    period: 'September 2024 - June 2025',
    responsibilities: [
      `Led 5-student team replacing MOSS at Drexel's College of Computing, conducting weekly standup meetings with stakeholders`,
      'Established CI/CD pipelines and test automation, significantly improving deployment reliability and code quality',
      'Set up and maintained package registries to streamline dependency management across team environments',
      'Created comprehensive technical documentation for all system components ensuring knowledge transfer and maintainability',
      'Managed project timeline and deliverables through Agile methodology, ensuring on-time completion of all milestones'
    ],
    image: <Image src={DREXEL} />,
    technologies: ['Docker', 'React', 'TanStack', 'S3', 'Celery', 'Redis', 'Postgres', 'Python', 'Playwright', 'Rust']
  },
  {
    company: 'Susquehanna International Group',
    location: 'Bala Cynwyd, PA',
    position: 'Software Engineer Co-op',
    team: 'Team Order Routing and Quoting (TORQ)',
    period: 'September 2023 - March 2024',
    responsibilities: [
      'Built a C++ protocol metrics publisher that tails multiple files to process 5.8 billion messages everyday',
      'Developed a concurrent Python Kafka consumer to process 500+ million messages in 5 minutes, increasing speed by 9x',
      'Developed a FastAPI proxy to integrate Grafana with an internal messaging platform via RESTful API',
      'Designed CI/CD pipeline for Kubernetes deployment and automated testing for projects on GitLab'
    ],
    image: <Image src={SIG} />,
    technologies: ['C++', 'Python', 'Kafka', 'FastAPI', 'Kubernetes', 'GitLab CI/CD', 'Grafana', 'RESTful API']
  },
  {
    company: 'OPEX Corporation',
    location: 'Moorestown, NJ',
    position: 'Software Engineer Co-op',
    team: 'Warehouse Automation and Robotics',
    period: 'September 2022 - March 2023',
    responsibilities: [
      'Engineered async Windows IPC solution for C++ applications, reducing latency by 80%',
      'Developed Python tool integrating 15,000 pages of Doxygen documentation into C++ robot application',
      'Conducted end-to-end testing and integration of warehouse robotic systems to enhance operational reliability and uptime'
    ],
    image: <Image src={OPEX} height={"24"} />,
    technologies: ['C++', 'Python', 'Windows IPC', 'Doxygen', 'Robotics']
  },
  {
    company: 'Drexel University',
    location: 'Philadelphia, PA',
    position: 'Teaching Assistant',
    team: 'College of Computing & Informatics',
    period: 'September 2022 - March 2025',
    responsibilities: [
      'Mentored over 150 students during weekly labs and tutoring hours, helping them grasp complex concepts',
      'Developed grading tool with Python and JavaScript to automate assignment compilation, reducing grading time by 80%',
      'Created extensible Python plugin architecture enabling custom compilation workflows and automated assessment tools'
    ],
    image: <Image src={DREXEL} />,
    technologies: ['Python', 'JavaScript', 'Mentoring', 'Plugin Architecture']
  },
];
