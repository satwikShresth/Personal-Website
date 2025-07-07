import { Image } from '@chakra-ui/react'
import SIG from '/sig.jpg'
import OPEX from '/opex.png'
import DREXEL from '/drexel.png'

export const experiences = [
  {
    company: 'Susquehanna International Group',
    location: 'Bala Cynwyd, PA',
    position: 'Software Engineer Co-op',
    team: 'Team Order Routing and Quoting (TORQ)',
    period: 'September 2023 - March 2024',
    responsibilities: [
      'Developed a C++ protocol metrics publisher to tail multiple log files to generate data frames for 5.8 billion+ messages/day',
      'Built a Python orchestration layer with C++ bindings to aggregate metric data-frames and stream real-time data on Grafana',
      'Created a Python FastAPI proxy server to integrate OpenTelemetry alerts with an internal messaging platform via RESTful API',
      'Developed a concurrent Python Kafka consumer to process 500+ million messages in 5 minutes, increasing speed by 9x',
    ],
    image: <Image src={SIG} />,
    technologies: [
      'C++',
      'Python',
      'Kafka',
      'FastAPI',
      'Kubernetes',
      'GitLab CI/CD',
      'Grafana',
      'RESTful API',
    ],
  },
  {
    company: 'OPEX Corporation',
    location: 'Moorestown, NJ',
    position: 'Software Engineer Co-op',
    team: 'Warehouse Automation and Robotics',
    period: 'September 2022 - March 2023',
    responsibilities: [
      'Implemented asynchronous windows inter-process communication, connecting multiple C++ applications with proprietary protocol, reducing alert latency by 60%',
      'Developed a Python tool using Doxygen to integrate 15,000+ dynamic Windows Help files into a C++ MFC application',
      "Wrote comprehensive unit and integration tests for robot's host application, increasing test coverage and operational reliability",
    ],
    image: <Image src={OPEX} height="24" />,
    technologies: ['C++', 'Python', 'Windows IPC', 'Doxygen', 'Robotics'],
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
    ],
    image: <Image src={DREXEL} />,
    technologies: ['Python', 'JavaScript', 'Mentoring', 'Plugin Architecture'],
  },
]
