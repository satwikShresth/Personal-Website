import {
  FaDatabase,
  FaDocker,
  FaReact,
  FaSearch,
  FaServer,
} from 'react-icons/fa'
import { MarkerType } from '@xyflow/react'
import { makeLabel } from '../Graph/utils'
import type { EdgeConfig, NodeConfig } from '../Graph/types'

export const nodes: Array<NodeConfig> = [
  {
    id: 'react',
    type: 'info',
    data: {
      name: 'react',
      label: makeLabel(FaReact, 'React Frontend'),
      info: 'Material UI · React Hook Form · Tesseract.js · Zustand',
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8,
        minWidth: 160,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Rich Client</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Component‑driven UI with Material UI, form state via
              React Hook Form, OCR powered by Tesseract.js and app state
              in Zustand.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Fast & interactive</em>
          </>
        ),
      },
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'group-docker',
    type: 'labeledGroup',
    style: {
      border: '1px dashed #555',
      borderRadius: 10,
    },
    height: 420,
    data: {
      label: makeLabel(FaDocker, 'Docker Network'),
      Card: {
        Header: (
          <>
            <strong>Isolated Services</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Everything runs in a single Docker network for consistency across
              dev, staging, and production.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Reproducible infra</em>
          </>
        ),
      },
    },
  },
  {
    id: 'caddy',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel(FaServer, 'Caddy (Reverse Proxy)'),
      info: 'TLS termination & routing',
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
              Auto‑provisions TLS certs and forwards requests to your Hono
              backend.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Secure by default</em>
          </>
        ),
      },
    },
    position: { x: 200, y: 100 },
  },
  {
    id: 'backend',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel(FaServer, 'Hono + Drizzle'),
      info: 'Stateless API · SendGrid',
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>API Layer</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Hono REST API with Drizzle ORM (no user data stored) and SendGrid
              for transactional emails.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Lightweight & reliable</em>
          </>
        ),
      },
    },
    position: { x: 200, y: 0 },
  },
  {
    id: 'postgres',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel(FaDatabase, 'PostgreSQL'),
      info: 'Relational DB',
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
            <strong>ACID Store</strong>
          </>
        ),
        Body: (
          <>
            <p>Holds only system metadata; user data is not persisted here.</p>
          </>
        ),
        Footer: (
          <>
            <em>Transactional safety</em>
          </>
        ),
      },
    },
    position: { x: 400, y: 0 },
  },
  {
    id: 'meilisearch',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel(FaSearch, 'MeiliSearch'),
      info: 'Real‑time text indexing',
      style: {
        padding: 12,
        border: '2px solid #9C27B0',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10,
      },
      Card: {
        Header: (
          <>
            <strong>Instant Search</strong>
          </>
        ),
        Body: (
          <>
            <p>
              Indexes all content for real‑time full‑text search with filters.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Fast & typo‑tolerant</em>
          </>
        ),
      },
    },
    position: { x: 400, y: 100 },
  },
]

export const edges: Array<EdgeConfig> = [
  {
    id: 'e-react-caddy',
    source: 'react',
    target: 'caddy',
    label: 'HTTPS & search',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-caddy-backend',
    source: 'caddy',
    target: 'backend',
    label: 'forwards API',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-backend-postgres',
    source: 'backend',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-backend-meilisearch',
    source: 'backend',
    target: 'meilisearch',
    label: 'push indexing',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-caddy-meilisearch',
    source: 'caddy',
    target: 'meilisearch',
    label: 'forwards search',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
]
