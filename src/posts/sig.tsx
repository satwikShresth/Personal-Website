import {
   FaBell,
   FaChartLine,
   FaCode,
   FaCog,
   FaDatabase,
   FaFileAlt,
   FaPython,
   FaServer,
   FaStream
} from 'react-icons/fa';
import { MarkerType } from '@xyflow/react';
import { MdOutlineStorage } from 'react-icons/md';
import { Badge, Box, Flex, Icon, List, Stack, Text } from '@chakra-ui/react';
import { makeLabel } from '@/components/Project/Graph/utils';
import type { EdgeConfig, NodeConfig } from '@/components/Project/Graph/types';

interface Diagrams {
   [key: string]: {
      nodes: Array<NodeConfig>;
      edges: Array<EdgeConfig>;
   };
}

const diagrams: Diagrams = {
   metricsPublisher: {
      nodes: [
         {
            id: 'metrics-publisher-group',
            type: 'labeledGroup',
            data: {
               label: makeLabel(
                  FaCode,
                  'C++ Metrics Publisher (5.8B+ messages/day)'
               )
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
               label: makeLabel(FaServer, 'Market Gateway 1'),
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="blue.600"
                        mb={2}
                     >
                        Exchange Gateway Interface
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           {
                              'High-performance market-facing systems handling real-time exchange data communication with ultra-low latency (<100μs). Engineered for reliability with 99.999% uptime.'
                           }
                        </Text>
                        <Flex mt={2} gap={2}>
                           <Badge colorScheme="blue">High Throughput</Badge>
                           <Badge colorScheme="green">Fault Tolerant</Badge>
                        </Flex>
                     </Box>
                  )
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
               label: makeLabel(FaServer, 'Market Gateway 2'),
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="blue.600"
                        mb={2}
                     >
                        Redundant Gateway Node
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Secondary market interface providing seamless
                           failover capabilities with active-active
                           configuration. Maintains consistent performance
                           metrics across load-balanced traffic.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaFileAlt, 'Log Files'),
               info: '',
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="green.600"
                        mb={2}
                     >
                        Gateway Event Logs
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Structured key-value pairs with optimized delimiters,
                           designed for high-speed processing. Generated at ~67K
                           events/second with compression ratio of 5:1.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaCode, 'C++ Metrics Publisher'),
               info: 'Tails and processes log files',
               style: {
                  padding: 12,
                  border: '2px solid #EA4335',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="red.600"
                        mb={2}
                     >
                        High-Performance Decoder Engine
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Custom zero-copy parser with SIMD acceleration,
                           achieving 95% CPU efficiency. Processes 5.8B+ daily
                           messages with 99.9997% accuracy and sub-millisecond
                           latency.
                        </Text>
                     </Box>
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
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="yellow.600"
                        mb={2}
                     >
                        Structured Metrics Output
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Binary-encoded data frames optimized for downstream
                           consumption with columnar organization. Memory-mapped
                           for zero-copy transfer to consumers.
                        </Text>
                     </Box>
                  )
               },
               style: {
                  padding: 12,
                  border: '2px solid #FBBC05',
                  borderRadius: 8
               }
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
               label: makeLabel(
                  FaPython,
                  'Python Orchestration Layer with C++ Bindings'
               )
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
               style: {
                  padding: 12,
                  border: '2px solid #EA4335',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="red.600"
                        mb={2}
                     >
                        Hybrid Performance Layer
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Python service with C++ extension modules achieving
                           better performance. Handles JSON transformation and
                           data enrichment with 8x better throughput than pure
                           Python.
                        </Text>
                     </Box>
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
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="yellow.600"
                        mb={2}
                     >
                        Distributed Search Engine
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Horizontally scaled Elasticsearch cluster handling
                           2TB+ of daily JSON metrics with sub-second query
                           response. Optimized indexing patterns with
                           time-series rollover.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaChartLine, 'Grafana Dashboard'),
               info: 'Real-time metrics visualization',
               style: {
                  padding: 12,
                  border: '2px solid #34A853',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="green.600"
                        mb={2}
                     >
                        Real-Time Analytics Platform
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Interactive visualization dashboards with
                           custom-built panels providing millisecond-level
                           granularity. Enables engineers to identify anomalies
                           and performance bottlenecks instantly.
                        </Text>
                     </Box>
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
      ]
   },
   kafka: {
      nodes: [
         {
            id: 'kafka-group',
            type: 'labeledGroup',
            data: {
               label: makeLabel(
                  MdOutlineStorage,
                  'Concurrent Python Kafka Consumer (9x speedup)'
               )
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
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="blue.600"
                        mb={2}
                     >
                        Message Stream Infrastructure
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Distributed Kafka cluster handling 500M+ messages in
                           under 5 minutes. Configured with optimal partition
                           strategy and retention policies for trading data.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaPython, 'Python Concurrent Consumer'),
               info: 'Processes messages in parallel',
               style: {
                  padding: 12,
                  border: '2px solid #EA4335',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="red.600"
                        mb={2}
                     >
                        Multi-threaded Processing Engine
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Custom Python implementation using asyncio and thread
                           pools to achieve 9x throughput improvement.
                           Dynamically scales worker count based on message
                           backlog and system load.
                        </Text>
                     </Box>
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
               style: {
                  padding: 12,
                  border: '2px solid #34A853',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="green.600"
                        mb={2}
                     >
                        Analytics Transformation Pipeline
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Stateful processing engine applying business logic
                           and enrichment to raw market data. Implements
                           sophisticated anomaly detection with 99.7% accuracy.
                        </Text>
                     </Box>
                  )
               }
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
               style: {
                  padding: 12,
                  border: '2px solid #FBBC05',
                  borderRadius: 8
               },
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="yellow.600"
                        mb={2}
                     >
                        Time-Series Data Repository
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Optimized columnar storage for high-speed analytics
                           queries. Maintains 3 months of hot data with
                           intelligent downsampling for historical analysis.
                        </Text>
                     </Box>
                  )
               }
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
               label: makeLabel(FaServer, 'Alerts Proxy')
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
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="yellow.600"
                        mb={2}
                     >
                        Time-Series Monitoring Backend
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Highly available Prometheus cluster with federated
                           architecture and custom alerting rules. Configured
                           with intelligent rate limiting and pre-aggregation.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaChartLine, 'Grafana'),
               info: 'Alerting & Dashboards',
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="green.600"
                        mb={2}
                     >
                        Alert Management Interface
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Centralized alert configuration with multi-condition
                           rules and advanced notification routing. Provides
                           dynamic thresholding based on historical patterns.
                        </Text>
                        <Flex mt={2} gap={2}>
                           <Badge colorScheme="red">Critical</Badge>
                           <Badge colorScheme="orange">Warning</Badge>
                           <Badge colorScheme="blue">Info</Badge>
                        </Flex>
                     </Box>
                  )
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
               label: makeLabel(MdOutlineStorage, 'OpenTelemetry'),
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="red.600"
                        mb={2}
                     >
                        Distributed Tracing Framework
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Comprehensive observability platform integrating
                           traces, metrics, and logs across the entire system.
                           Enables root cause analysis with full-stack context.
                        </Text>
                     </Box>
                  )
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
               label: makeLabel(FaServer, 'Alerts Proxy Server'),
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="blue.600"
                        mb={2}
                     >
                        Alerting Gateway Service
                     </Box>
                  ),
                  Body: (
                     <Box p={2}>
                        <List.Root mr={3}>
                           <List.Item>
                              <Text fontSize="md">
                                 Payload parsing and strict schema enforcement
                                 using Pydantic models
                              </Text>
                           </List.Item>
                           <List.Item>
                              <Text fontSize="md">
                                 Pluggable builders to transform validated data
                                 into internal messaging system notifications
                              </Text>
                           </List.Item>
                        </List.Root>
                     </Box>
                  )
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
               label: makeLabel(FaStream, 'Internal Messaging'),
               Card: {
                  Header: (
                     <Box
                        as="h3"
                        fontWeight="bold"
                        fontSize="lg"
                        color="yellow.600"
                        mb={2}
                     >
                        Enterprise Communication Hub
                     </Box>
                  ),
                  Body: (
                     <Box>
                        <Text fontSize="md">
                           Multi-channel notification delivery through Symphony,
                           Microsoft Teams, and email with intelligent routing
                           based on alert severity and on-call schedules.
                        </Text>
                        <Stack direction="row" mt={2} justify="space-around">
                           <Box textAlign="center">
                              <Icon as={FaBell} color="red.500" boxSize={4} />
                              <Text fontSize="xs">Critical</Text>
                           </Box>
                           <Box textAlign="center">
                              <Icon
                                 as={FaBell}
                                 color="yellow.500"
                                 boxSize={4}
                              />
                              <Text fontSize="xs">Warning</Text>
                           </Box>
                           <Box textAlign="center">
                              <Icon as={FaBell} color="blue.500" boxSize={4} />
                              <Text fontSize="xs">Info</Text>
                           </Box>
                        </Stack>
                     </Box>
                  )
               },
               style: {
                  padding: 12,
                  border: '2px solid #FBBC05',
                  borderRadius: 8
               }
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
            label: 'sends alerts'
         },
         {
            id: 'e-alert-internal',
            source: 'alerts-proxy',
            target: 'internal-messaging',
            label: 'sends'
         }
      ]
   }
};

export const MetricsPublisher = diagrams.metricsPublisher;
export const MetricsTranscoder = diagrams.metricsTranscoder;
export const Kafka = diagrams.kafka;
export const AlertsProxy = diagrams.alertsProxy;
