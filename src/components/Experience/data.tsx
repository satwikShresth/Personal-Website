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
    responsibilities: [],
    image: <Image src={SIG} />,
    technologies: []
  },
  {
    company: 'OPEX Corporation',
    location: 'Moorestown, NJ',
    position: 'Software Engineer Co-op',
    team: 'Warehouse Automation and Robotics',
    period: 'September 2022 - March 2023',
    responsibilities: [],
    image: <Image src={OPEX} height={"24"} />,
    technologies: []
  },
  {
    company: 'Drexel University',
    location: 'Philadelphia, PA',
    position: 'Teaching Assistant',
    team: 'College of Computing & Informatics',
    period: 'September 2022 - March 2025',
    responsibilities: [],
    image: <Image src={DREXEL} />,
    technologies: []
  },
];
