import { FaChartLine, FaCode, FaCog, FaDatabase, FaFileAlt, FaPython, FaServer, FaStream } from "react-icons/fa";
import { MarkerType } from "@xyflow/react";
import { MdOutlineStorage } from "react-icons/md";
import { makeLabel } from "../Project/Graph/utils";
import type { EdgeConfig, NodeConfig } from "../Project/Graph/types";

interface Diagrams {
  [key: string]: {
    nodes: Array<NodeConfig>;
    edges: Array<EdgeConfig>;
  }
}

const diagrams: Diagrams = {
  metricsPublisher: {
    nodes: [
      {
        id: 'metrics-publisher-group',
        type: 'labeledGroup',
        data: {
          label: makeLabel(FaCode, 'C++ Metrics Publisher (5.8B+ messages/day)'),
        },
        style: { border: '1px dashed #555', borderRadius: 10 },
        position: { x: 0, y: 0 },
        height: 450,
      },
      {
        id: 'gateway1',
        type: 'info',
        parentId: 'metrics-publisher-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaServer, 'Market Gateway 1'),
          Card: {
            Header: <>Exchange Gateways</>,
            Body: (
              <>
                <p>
                  These are the systems that are exposed to the market. They recieve/send data to the exchanges
                </p>
              </>
            ),
          },
          style: { padding: 12, border: '2px solid #3B5BDB', borderRadius: 8 }
        }
      },
      {
        id: 'gateway2',
        type: 'info',
        parentId: 'metrics-publisher-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaServer, 'Market Gateway 2'),
          Card: {
            Header: <>Exchange Gateways</>,
            Body: (
              <>
                <p>
                  These are the systems that are exposed to the market. They recieve/send data to the exchanges
                </p>
              </>
            ),
          },
          style: { padding: 12, border: '2px solid #3B5BDB', borderRadius: 8 }
        }
      },
      {
        id: 'log-files',
        type: 'info',
        parentId: 'metrics-publisher-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaFileAlt, 'Log Files'),
          info: '',
          Card: {
            Header: <>Log files generated from the gateways</>,
            Body: (
              <>
                <p>
                  Key-value pairs with delimiters in string format
                </p>
              </>
            ),
          },

          style: { padding: 12, border: '2px solid #34A853', borderRadius: 8 }
        }
      },
      {
        id: 'metrics-publisher',
        type: 'info',
        parentId: 'metrics-publisher-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaCode, 'C++ Metrics Publisher'),
          info: 'Tails and processes log files',
          style: { padding: 12, border: '2px solid #EA4335', borderRadius: 8 },
          Card: {
            Header: <strong>Custom Decoder with publisher</strong>,
            Body: (
              <>
                <p>
                  Efficiently parses string-based key-value pairs with custom highly performant decoder, processing massive volumes while maintaining real-time performance.
                </p>
              </>
            )
          }
        }
      },
      {
        id: 'data-frames',
        type: 'info',
        parentId: 'metrics-publisher-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaStream, 'Data Frames'),
          Card: {
            Header: <strong>Structured metrics data</strong>,
            Body: (
              <>
                <p>
                  Metric data produced by the publisher
                </p>
              </>
            )
          },
          style: { padding: 12, border: '2px solid #FBBC05', borderRadius: 8 }
        }
      }
    ],
    edges: [
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
    ]
  },
  metricsTranscoder: {
    nodes: [
      {
        id: 'orchestration-group',
        type: 'labeledGroup',
        data: {
          label: makeLabel(FaPython, 'Python Orchestration Layer with C++ Bindings'),
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
          label: makeLabel(FaPython, 'Python Service'),
          info: 'With C++ Bindings',
          style: { padding: 12, border: '2px solid #EA4335', borderRadius: 8 },
          Card: {
            Header: <strong>Integration Layer</strong>,
            Body: (
              <>
                <p>
                  Consumes data frames, transforms into JSON, and prepares for visualization while maintaining high throughput with C++ bindings.
                </p>
              </>
            )
          }
        }
      },
      {
        id: 'elasticsearch',
        type: 'info',
        parentId: 'orchestration-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaDatabase, 'Elasticsearch'),
          Card: {
            Header: <>Json storage</>,
            Body: (
              <>
                <p>
                  Elasticsearch is a json database built for distributed search and analytics
                </p>
              </>
            ),
          },
          style: { padding: 12, border: '2px solid #FBBC05', borderRadius: 8 }
        }
      },
      {
        id: 'grafana',
        type: 'info',
        parentId: 'orchestration-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaChartLine, 'Grafana Dashboard'),
          info: 'Real-time metrics visualization',
          style: { padding: 12, border: '2px solid #34A853', borderRadius: 8 },
          Card: {
            Header: <strong>Volume Insights</strong>,
            Body: (
              <>
                <p>
                  Visualizes critical metrics for engineers, enabling real-time monitoring of system performance and trading activities.
                </p>
              </>
            ),
            Footer: (
              <>
                <p>
                  Something goes wrong graphana is the first one to fire alerts
                </p>
              </>
            )

          }
        }
      }
    ],
    edges: [
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
    ],
  },
  kafka: {
    nodes: [
      {
        id: 'kafka-group',
        type: 'labeledGroup',
        data: {
          label: makeLabel(MdOutlineStorage, 'Concurrent Python Kafka Consumer (9x speedup)'),
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
          label: makeLabel(MdOutlineStorage, 'Kafka Brokers'),
          Card: {
            Header: <>High-Speed Message Processing</>,
            Body: (
              <>
                <p>
                  Processes 500+ million messages in just 5 minutes, achieving 9x speedup through optimized concurrent processing techniques.
                </p>
              </>
            ),
            Footer: <em>Parallelized for maximum throughput</em>
          },
          style: { padding: 12, border: '2px solid #3B5BDB', borderRadius: 8 }
        }
      },
      {
        id: 'python-consumer',
        type: 'info',
        parentId: 'kafka-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaPython, 'Python Concurrent Consumer'),
          info: 'Processes messages in parallel',
          style: { padding: 12, border: '2px solid #EA4335', borderRadius: 8 },
          Card: {
            Header: <strong>Parallel Processing</strong>,
            Body: (
              <>
                <p>
                  Leverages Python's concurrency features to process messages simultaneously across multiple workers.
                </p>
              </>
            )
          }
        }
      },
      {
        id: 'processing-engine',
        type: 'info',
        parentId: 'kafka-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaCog, 'Data Processing'),
          info: 'Transforms raw messages',
          style: { padding: 12, border: '2px solid #34A853', borderRadius: 8 }
        }
      },
      {
        id: 'analytics-db',
        type: 'info',
        parentId: 'kafka-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaDatabase, 'Analytics Store'),
          info: 'Processed market data',
          style: { padding: 12, border: '2px solid #FBBC05', borderRadius: 8 }
        }
      }
    ],
    edges: [
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
    ]
  },
  alertsProxy: {
    nodes: [
      {
        id: 'alerts-proxy-group',
        type: 'labeledGroup',
        data: {
          label: makeLabel(FaServer, 'Alerts Proxy'),
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
          label: makeLabel(FaChartLine, 'Prometheus'),
          info: 'Metrics & Alert Source',
          Card: {
            Header: <>Metrics & Alert Source</>,
          },
          style: { padding: 12, border: '2px solid #FBBC05', borderRadius: 8 }
        }
      },
      {
        id: 'grafana-alerts',
        type: 'info',
        parentId: 'alerts-proxy-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaChartLine, 'Grafana'),
          info: 'Alerting & Dashboards',
          Card: {
            Header: <>Alerting & visualization Dashboards</>,
          },
          style: { padding: 12, border: '2px solid #34A853', borderRadius: 8 }
        }
      },
      {
        id: 'otel',
        type: 'info',
        parentId: 'alerts-proxy-group',
        extent: 'parent',
        data: {
          label: makeLabel(MdOutlineStorage, 'OpenTelemetry'),
          Card: {
            Header: <>Trace & Metric Alerts</>,
          },
          style: { padding: 12, border: '2px solid #EA4335', borderRadius: 8 }
        }
      },
      {
        id: 'alerts-proxy',
        type: 'info',
        parentId: 'alerts-proxy-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaServer, 'Reverse Proxy'),
          Card: {
            Header: <>Alerts Proxy</>,
            Body: <><p>This is the server that works as a proxy for internal messaging systems</p></>,
            Footer: <></>,
          },

          style: { padding: 12, border: '2px solid #3B5BDB', borderRadius: 8 }
        }
      },
      {
        id: 'internal-messaging',
        type: 'info',
        parentId: 'alerts-proxy-group',
        extent: 'parent',
        data: {
          label: makeLabel(FaStream, 'Internal Messaging'),
          Card: {
            Header: <>Symphony, Microsoft Teams etc</>,
          },
          style: { padding: 12, border: '2px solid #FBBC05', borderRadius: 8 }
        }
      }
    ],
    edges: [
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
      },
      {
        id: 'e-alert-internal',
        source: 'alerts-proxy',
        target: 'internal-messaging',
        label: 'sends',
      }

    ]
  }
}

export const MetricsPublisher = diagrams.metricsPublisher;
export const MetricsTranscoder = diagrams.metricsTranscoder;
export const Kafka = diagrams.kafka;
export const AlertsProxy = diagrams.alertsProxy;
