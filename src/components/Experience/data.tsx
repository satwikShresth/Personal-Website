import { Image } from "@chakra-ui/react";
import SIG from '/sig.jpg';
import OPEX from '/opex.png';
import DREXEL from '/drexel.png';

export const experiences = [
  {
    company: 'Susquehanna International Group',
    location: 'Bala Cynwyd, PA',
    position: 'Software Engineer Co-op',
    team: 'Team Order Routing and Quoting (TORQ)',
    period: 'September 2023 - March 2024',
    responsibilities: [
      'Built a C++ protocol metrics publisher that tails multiple files to process 5.8 billion messages per day',
      'Developed a concurrent Kafka consumer client using Python to process 500 million messages in under 5 minutes',
      'Developed a FastAPI proxy to integrate Grafana with an internal messaging platform via RESTful API',
      'Designed CI/CD pipeline for Kubernetes deployment and automated testing for projects on GitLab'
    ],
    image: <Image src={SIG} />,
    technologies: ['C++', 'Python', 'Kafka', 'FastAPI', 'Kubernetes', 'GitLab CI/CD', 'Grafana']
  },
  {
    company: 'OPEX Corporation',
    location: 'Moorestown, NJ',
    position: 'Software Engineer Co-op',
    team: 'Warehouse Automation and Robotics',
    period: 'September 2022 - March 2023',
    responsibilities: [
      'Engineered async Windows inter-process communication solution among C++ applications, reducing latency by 80%',
      'Developed Python tool with Doxygen integrating 15,000 pages of documentation into a C++ robot host application'
    ],
    image: <Image src={OPEX} height={"24"} />,
    technologies: ['C++', 'Python', 'Windows IPC', 'Doxygen']
  },
  {
    company: 'Drexel University',
    location: 'Philadelphia, PA',
    position: 'Teaching Assistant',
    team: 'College of Computing & Informatics',
    period: 'September 2022 - March 2025',
    responsibilities: [
      'Mentoring over 150 students during weekly labs and tutoring hours by helping them grasp complex concepts',
      'Developed a Python tool to automate compiling & organizing assignments, reducing the time spent grading by 80%'
    ],
    image: <Image src={DREXEL} />,
    technologies: ['Python', 'Mentoring', 'Computer Science']
  }
];
