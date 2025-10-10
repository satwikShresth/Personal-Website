import {
  FaCloud,
  FaDatabase,
  FaDocker,
  FaPython,
  FaReact,
  FaServer,
} from 'react-icons/fa'
import { MarkerType } from '@xyflow/react'
import { makeLabel } from '../Graph/utils'
import type { EdgeConfig, NodeConfig } from '../Graph/types'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import * as serverFns from '@/routes/-serverFn'
import { useServerFn } from '@tanstack/react-start'

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
              All UI routes handled client‑side. Every request hits its own
              path, served through Caddy for seamless navigation.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Path‑based routing via Caddy</em>
          </>
        ),
      },
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'group-docker',
    type: 'labeledGroup',
    parentId: 'react',
    height: 410,
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
              Encapsulates every service in an isolated network. Provides
              environment orchestration, security boundaries, and a reproducible
              dev/staging workflow.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Secure & replicable stack</em>
          </>
        ),
      },
    },
    style: {
      border: '1px dashed #555',
      borderRadius: 10,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'caddy',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
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
              Auto‑provisions TLS certificates and renews them. Routes incoming
              traffic to the appropriate backend.
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
              Manages complex DB interactions, authorization flows, and
              work‑order queuing. Fully documented routes make it easy for the
              frontend to consume.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Client‑friendly endpoints</em>
          </>
        ),
      },
    },
    parentId: 'group-docker',
    extent: 'parent',
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
        ),
      },
    },
    parentId: 'group-docker',
    extent: 'parent',
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
              Handles high‑concurrency workloads with robust transaction
              support. Scales horizontally with replicas and partitioning.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Reliable relational DB</em>
          </>
        ),
      },
    },
    parentId: 'group-docker',
    extent: 'parent',
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
              Self‑manages Python workloads—including numpy and Rust‑accelerated
              tasks—for complex processing like plagiarism detection.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Cross‑language interoperability</em>
          </>
        ),
      },
    },
    parentId: 'group-docker',
    extent: 'parent',
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
              Offloads file uploads/downloads from the backend. Generates signed
              URLs for secure, direct client access.
            </p>
          </>
        ),
        Footer: (
          <>
            <em>Scalable & durable</em>
          </>
        ),
      },
    },
    parentId: 'group-docker',
    extent: 'parent',
  },
]

export const edges: Array<EdgeConfig> = [
  {
    id: 'e-react-caddy',
    source: 'react',
    target: 'caddy',
    label: 'HTTPS',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-caddy-ts',
    source: 'caddy',
    target: 'ts',
    label: 'forwards API',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-ts-postgres',
    source: 'ts',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-ts-redis',
    source: 'ts',
    target: 'redis',
    label: 'push jobs',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-celery-redis',
    source: 'celery',
    target: 'redis',
    label: 'pull jobs',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-celery-postgres',
    source: 'celery',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-caddy-s3',
    source: 'caddy',
    target: 's3',
    label: 'upload/download via signed URL for Client',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-ts-s3',
    source: 'ts',
    target: 's3',
    label: 'issues signed URL',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
]

// Video component for live demo
const VideoDemo = () => {
  const getVideoLink = useServerFn(serverFns.getVideoLink)
  const { data: preSignedUrl, isLoading, error } = useQuery({
    queryKey: ['video-link'],
    queryFn: () => getVideoLink(),
    select: (s) => s.preSignedUrl
  })

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Text>Loading video...</Text>
      </Box>
    )
  }

  if (error || !preSignedUrl) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">Failed to load video</Text>
      </Box>
    )
  }

  return (
    <VStack gap={4} align="stretch">
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
      </Text>
      <Box
        width="100%"
        maxWidth="600px"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        <video
          controls
          width="100%"
          style={{ borderRadius: '8px' }}
          src={preSignedUrl}
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </Box>
    </VStack>
  )
}

export { VideoDemo }
