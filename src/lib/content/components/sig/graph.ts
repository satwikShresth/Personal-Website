import { MarkerType } from '@xyflow/svelte';
import { makeLabel } from '$lib/components/architecture/makeLabel';
import type { EdgeConfig, NodeConfig } from '$lib/components/architecture/types';

export const metricsPublisherNodes: Array<NodeConfig> = [
  {
    id: 'metrics-publisher-group',
    type: 'labeledGroup',
    data: {
      label: makeLabel('code', 'C++ Metrics Publisher (5.8B+ messages/day)')
    },
    style: { border: '1px dashed #555', borderRadius: 10 },
    position: { x: 0, y: 0 },
    height: 450
  },
  {
    id: 'gateway1',
    type: 'info',
    parentId: 'metrics-publisher-group',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Market Gateway 1'),
      Card: {
        Header: 'Exchange Gateway Interface',
        Body: 'High-performance market-facing systems handling real-time exchange data communication with ultra-low latency (<100μs). Engineered for reliability with 99.999% uptime.',
        Footer: 'High Throughput · Fault Tolerant'
      },
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8
      }
    }
  },
  {
    id: 'gateway2',
    type: 'info',
    parentId: 'metrics-publisher-group',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Market Gateway 2'),
      Card: {
        Header: 'Redundant Gateway Node',
        Body: 'Secondary market interface providing seamless failover capabilities with active-active configuration. Maintains consistent performance metrics across load-balanced traffic.'
      },
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8
      }
    }
  },
  {
    id: 'log-files',
    type: 'info',
    parentId: 'metrics-publisher-group',
    extent: 'parent',
    data: {
      label: makeLabel('file', 'Log Files'),
      Card: {
        Header: 'Gateway Event Logs',
        Body: 'Structured key-value pairs with optimized delimiters, designed for high-speed processing. Generated at ~67K events/second with compression ratio of 5:1.'
      },
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8
      }
    }
  },
  {
    id: 'metrics-publisher',
    type: 'info',
    parentId: 'metrics-publisher-group',
    extent: 'parent',
    data: {
      label: makeLabel('code', 'C++ Metrics Publisher'),
      info: 'Tails and processes log files',
      Card: {
        Header: 'High-Performance Decoder Engine',
        Body: 'Custom zero-copy parser with SIMD acceleration, achieving 95% CPU efficiency. Processes 5.8B+ daily messages with 99.9997% accuracy and sub-millisecond latency.'
      },
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8
      }
    }
  },
  {
    id: 'data-frames',
    type: 'info',
    parentId: 'metrics-publisher-group',
    extent: 'parent',
    data: {
      label: makeLabel('stream', 'Data Frames'),
      Card: {
        Header: 'Structured Metrics Output',
        Body: 'Binary-encoded data frames optimized for downstream consumption with columnar organization. Memory-mapped for zero-copy transfer to consumers.'
      },
      style: {
        padding: 12,
        border: '2px solid #FBBC05',
        borderRadius: 8
      }
    }
  }
];

export const metricsPublisherEdges: Array<EdgeConfig> = [
  {
    id: 'e-gateway1-logs',
    source: 'gateway1',
    target: 'log-files',
    label: 'writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-gateway2-logs',
    source: 'gateway2',
    target: 'log-files',
    label: 'writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-logs-publisher',
    source: 'log-files',
    target: 'metrics-publisher',
    label: 'tails',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-publisher-frames',
    source: 'metrics-publisher',
    target: 'data-frames',
    label: 'generates',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

export const metricsTranscoderNodes: Array<NodeConfig> = [
  {
    id: 'orchestration-group',
    type: 'labeledGroup',
    data: {
      label: makeLabel('python', 'Python Orchestration Layer with C++ Bindings')
    },
    style: { border: '1px dashed #555', borderRadius: 10, padding: 10 },
    position: { x: 0, y: 0 },
    height: 400
  },
  {
    id: 'python-layer',
    type: 'info',
    parentId: 'orchestration-group',
    extent: 'parent',
    data: {
      label: makeLabel('python', 'Python Service'),
      info: 'With C++ Bindings',
      Card: {
        Header: 'Hybrid Performance Layer',
        Body: 'Python service with C++ extension modules achieving better performance. Handles JSON transformation and data enrichment with 8x better throughput than pure Python.'
      },
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8
      }
    }
  },
  {
    id: 'elasticsearch',
    type: 'info',
    parentId: 'orchestration-group',
    extent: 'parent',
    data: {
      label: makeLabel('database', 'Elasticsearch'),
      Card: {
        Header: 'Distributed Search Engine',
        Body: 'Horizontally scaled Elasticsearch cluster handling 2TB+ of daily JSON metrics with sub-second query response. Optimized indexing patterns with time-series rollover.'
      },
      style: {
        padding: 12,
        border: '2px solid #FBBC05',
        borderRadius: 8
      }
    }
  },
  {
    id: 'grafana',
    type: 'info',
    parentId: 'orchestration-group',
    extent: 'parent',
    data: {
      label: makeLabel('chart', 'Grafana Dashboard'),
      info: 'Real-time metrics visualization',
      Card: {
        Header: 'Real-Time Analytics Platform',
        Body: 'Interactive visualization dashboards with custom-built panels providing millisecond-level granularity. Enables engineers to identify anomalies and performance bottlenecks instantly.'
      },
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8
      }
    }
  }
];

export const metricsTranscoderEdges: Array<EdgeConfig> = [
  {
    id: 'e-frames-python',
    source: 'data-frames',
    target: 'python-layer',
    label: 'consumed by',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-python-elasticsearch',
    source: 'python-layer',
    target: 'elasticsearch',
    label: 'stores in',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-elastic-grafana',
    source: 'elasticsearch',
    target: 'grafana',
    label: 'visualizes',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

export const kafkaNodes: Array<NodeConfig> = [
  {
    id: 'kafka-group',
    type: 'labeledGroup',
    data: {
      label: makeLabel('storage', 'Concurrent Python Kafka Consumer (9x speedup)')
    },
    style: { border: '1px dashed #555', borderRadius: 10 },
    position: { x: 0, y: 0 },
    height: 500,
    width: 400
  },
  {
    id: 'kafka-broker',
    type: 'info',
    parentId: 'kafka-group',
    extent: 'parent',
    data: {
      label: makeLabel('storage', 'Kafka Brokers'),
      Card: {
        Header: 'Message Stream Infrastructure',
        Body: 'Distributed Kafka cluster handling 500M+ messages in under 5 minutes. Configured with optimal partition strategy and retention policies for trading data.'
      },
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8
      }
    }
  },
  {
    id: 'python-consumer',
    type: 'info',
    parentId: 'kafka-group',
    extent: 'parent',
    data: {
      label: makeLabel('python', 'Python Concurrent Consumer'),
      info: 'Processes messages in parallel',
      Card: {
        Header: 'Multi-threaded Processing Engine',
        Body: 'Custom Python implementation using asyncio and thread pools to achieve 9x throughput improvement. Dynamically scales worker count based on message backlog and system load.'
      },
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8
      }
    }
  },
  {
    id: 'processing-engine',
    type: 'info',
    parentId: 'kafka-group',
    extent: 'parent',
    data: {
      label: makeLabel('settings', 'Data Processing'),
      info: 'Transforms raw messages',
      Card: {
        Header: 'Analytics Transformation Pipeline',
        Body: 'Stateful processing engine applying business logic and enrichment to raw market data. Implements sophisticated anomaly detection with 99.7% accuracy.'
      },
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8
      }
    }
  },
  {
    id: 'analytics-db',
    type: 'info',
    parentId: 'kafka-group',
    extent: 'parent',
    data: {
      label: makeLabel('database', 'Analytics Store'),
      info: 'Processed market data',
      Card: {
        Header: 'Time-Series Data Repository',
        Body: 'Optimized columnar storage for high-speed analytics queries. Maintains 3 months of hot data with intelligent downsampling for historical analysis.'
      },
      style: {
        padding: 12,
        border: '2px solid #FBBC05',
        borderRadius: 8
      }
    }
  }
];

export const kafkaEdges: Array<EdgeConfig> = [
  {
    id: 'e-kafka-consumer',
    source: 'kafka-broker',
    target: 'python-consumer',
    label: 'consumes from',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-consumer-processing',
    source: 'python-consumer',
    target: 'processing-engine',
    label: 'processes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-processing-analytics',
    source: 'processing-engine',
    target: 'analytics-db',
    label: 'stores results',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

export const alertsProxyNodes: Array<NodeConfig> = [
  {
    id: 'alerts-proxy-group',
    type: 'labeledGroup',
    data: {
      label: makeLabel('server', 'Alerts Proxy')
    },
    style: { border: '1px dashed #555', borderRadius: 10 },
    position: { x: 0, y: 0 },
    height: 300
  },
  {
    id: 'prometheus',
    type: 'info',
    parentId: 'alerts-proxy-group',
    extent: 'parent',
    data: {
      label: makeLabel('chart', 'Prometheus'),
      info: 'Metrics & Alert Source',
      Card: {
        Header: 'Time-Series Monitoring Backend',
        Body: 'Highly available Prometheus cluster with federated architecture and custom alerting rules. Configured with intelligent rate limiting and pre-aggregation.'
      },
      style: {
        padding: 12,
        border: '2px solid #FBBC05',
        borderRadius: 8
      }
    }
  },
  {
    id: 'grafana-alerts',
    type: 'info',
    parentId: 'alerts-proxy-group',
    extent: 'parent',
    data: {
      label: makeLabel('chart', 'Grafana'),
      info: 'Alerting & Dashboards',
      Card: {
        Header: 'Alert Management Interface',
        Body: 'Centralized alert configuration with multi-condition rules and advanced notification routing. Provides dynamic thresholding based on historical patterns.'
      },
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8
      }
    }
  },
  {
    id: 'otel',
    type: 'info',
    parentId: 'alerts-proxy-group',
    extent: 'parent',
    data: {
      label: makeLabel('storage', 'OpenTelemetry'),
      Card: {
        Header: 'Distributed Tracing Framework',
        Body: 'Comprehensive observability platform integrating traces, metrics, and logs across the entire system. Enables root cause analysis with full-stack context.'
      },
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8
      }
    }
  },
  {
    id: 'alerts-proxy',
    type: 'info',
    parentId: 'alerts-proxy-group',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Alerts Proxy Server'),
      Card: {
        Header: 'Alerting Gateway Service',
        Body: 'Payload parsing and strict schema enforcement using Pydantic models. Pluggable builders to transform validated data into internal messaging system notifications.'
      },
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8
      }
    }
  },
  {
    id: 'internal-messaging',
    type: 'info',
    parentId: 'alerts-proxy-group',
    extent: 'parent',
    data: {
      label: makeLabel('stream', 'Internal Messaging'),
      Card: {
        Header: 'Enterprise Communication Hub',
        Body: 'Multi-channel notification delivery through Symphony, Microsoft Teams, and email with intelligent routing based on alert severity and on-call schedules.'
      },
      style: {
        padding: 12,
        border: '2px solid #FBBC05',
        borderRadius: 8
      }
    }
  }
];

export const alertsProxyEdges: Array<EdgeConfig> = [
  {
    id: 'e-prometheus-alert',
    source: 'prometheus',
    target: 'alerts-proxy',
    label: 'sends alerts',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-grafana-alert',
    source: 'grafana-alerts',
    target: 'alerts-proxy',
    label: 'sends alerts',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-otel-alert',
    source: 'otel',
    target: 'alerts-proxy',
    label: 'sends alerts',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-alert-internal',
    source: 'alerts-proxy',
    target: 'internal-messaging',
    label: 'sends',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

export const MetricsPublisher = {
  nodes: metricsPublisherNodes,
  edges: metricsPublisherEdges
};

export const MetricsTranscoder = {
  nodes: metricsTranscoderNodes,
  edges: metricsTranscoderEdges
};

export const Kafka = {
  nodes: kafkaNodes,
  edges: kafkaEdges
};

export const AlertsProxy = {
  nodes: alertsProxyNodes,
  edges: alertsProxyEdges
};
