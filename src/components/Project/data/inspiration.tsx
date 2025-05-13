import { FaCloud, FaDatabase, FaDocker, FaPython, FaReact, FaServer } from "react-icons/fa";
import { MarkerType } from "@xyflow/react";
import { makeLabel } from "../Graph/utils";
import type { EdgeConfig, NodeConfig } from "../Graph/types";

export const nodes: Array<NodeConfig> = [
  {
    id: 'react',
    type: 'info',
    data: {
      label: makeLabel(FaReact, 'React Frontend'),
      info: 'Your React app served by Caddy',
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Single‑Page Application</strong>
          </>
        ),
        Body: (
          <>
            <p>
              All UI routes handled client‑side. Every request hits its own path,
              served through Caddy for seamless navigation.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Path‑based routing via Caddy</em>
          </>
        )
      }
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'group-docker',
    type: 'group',
    data: {
      label: makeLabel(FaDocker, 'Docker Network'),
      Card: {
        Header: (
          <>
            <strong>One‑Click Setup</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Encapsulates every service in an isolated network.
              Provides environment orchestration, security boundaries, and
              a reproducible dev/staging workflow.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Secure & replicable stack</em>
          </>
        )
      }
    },
    position: { x: 0, y: 0 },
    style: {
      padding: 16,
      border: '1px dashed #555',
      borderRadius: 10,
      zIndex: 0,
    },
  },
  {
    id: 'caddy',
    type: 'info',
    data: {
      label: makeLabel(FaServer, 'Caddy (Reverse Proxy)'),
      info: 'Handles TLS & routes to Hono',
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8,
        minWidth: 160,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Auto‑HTTPS</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Auto‑provisions TLS certificates and renews them.
              Routes incoming traffic to the appropriate backend.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Secure by default</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
  {
    id: 'ts',
    type: 'info',
    data: {
      label: makeLabel(FaServer, 'TypeScript + Hono'),
      info: 'Your Hono‑based REST API',
      style: {
        padding: 10,
        border: '2px solid #EA4335',
        borderRadius: 8,
        minWidth: 140,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Robust API Layer</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Manages complex DB interactions, authorization flows, and work‑order queuing.
              Fully documented routes make it easy for the frontend to consume.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Client‑friendly endpoints</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
  {
    id: 'redis',
    type: 'info',
    data: {
      label: makeLabel(FaDatabase, 'Redis Queue'),
      info: 'Work queue for background jobs',
      style: {
        padding: 10,
        border: '2px solid #FBBC05',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>In‑Memory Speed</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Stores session data and job queues for lightning‑fast access.
              Ideal for transient state and rapid task dispatch.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Low‑latency data store</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
  {
    id: 'postgres',
    type: 'info',
    data: {
      label: makeLabel(FaDatabase, 'PostgreSQL'),
      info: 'Primary data store',
      style: {
        padding: 10,
        border: '2px solid #FBBC05',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>ACID‑Compliant Store</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Handles high‑concurrency workloads with robust transaction support.
              Scales horizontally with replicas and partitioning.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Reliable relational DB</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
  {
    id: 'celery',
    type: 'info',
    data: {
      label: makeLabel(FaPython, 'Celery Workers'),
      info: 'Python workers pulling from Redis',
      style: {
        padding: 10,
        border: '2px solid #34A853',
        borderRadius: 8,
        minWidth: 140,
        textAlign: 'center',
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Python Orchestration</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Self‑manages Python workloads—including numpy and Rust‑accelerated tasks—for complex processing like plagiarism detection.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Cross‑language interoperability</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
  {
    id: 's3',
    type: 'info',
    data: {
      label: makeLabel(FaCloud, 'Minio S3 Store'),
      info: 'Object storage for uploads',
      style: {
        padding: 12,
        border: '2px solid #5F6368',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Object Storage</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Offloads file uploads/downloads from the backend.
              Generates signed URLs for secure, direct client access.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Scalable & durable</em>
          </>
        )
      }
    },
    parentNode: 'group-docker',
  },
];

export const edges: Array<EdgeConfig> = [
  {
    id: 'e-react-caddy',
    source: 'react',
    target: 'caddy',
    label: 'HTTPS',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-caddy-ts',
    source: 'caddy',
    target: 'ts',
    label: 'forwards API',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-postgres',
    source: 'ts',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-redis',
    source: 'ts',
    target: 'redis',
    label: 'push jobs',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-celery-redis',
    source: 'celery',
    target: 'redis',
    label: 'pull jobs',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-celery-postgres',
    source: 'celery',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-react-s3',
    source: 'react',
    target: 's3',
    label: 'upload/download via signed URL',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-s3',
    source: 'ts',
    target: 's3',
    label: 'issues signed URL',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
];
