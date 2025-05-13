import dagre from 'dagre';
import { Position } from '@xyflow/react';
import { Flex, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import type { EdgeConfig, LabelCreator, NodeConfig } from './types';

// Node dimensions used for layout
const NODE_WIDTH = 172;
const NODE_HEIGHT = 48;
const NODE_DEFAULTS = { draggable: false, selectable: false };

// Helper function to create labels with icons
export const makeLabel: LabelCreator = (Icon: IconType, text: string) => (
  <Flex align="center" gap="4px" style={{ fontSize: 12 }}>
    <Icon />
    <Text as="span">{text}</Text>
  </Flex>
);

// Apply automatic layout to nodes and edges
export function applyAutoLayout(
  rawNodes: Array<NodeConfig>,
  edges: Array<EdgeConfig>,
  direction: 'TB' | 'LR' | 'BT' | 'RL' = 'TB'
): Array<NodeConfig> {
  const map = new Map(rawNodes.map(n => [n.id, { ...n }]));
  const leafs = rawNodes.filter(n => n.type !== 'group');

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, marginx: 20, marginy: 20 });

  leafs.forEach(n => g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT }));
  edges.forEach(e => g.setEdge(e.source, e.target));
  dagre.layout(g);

  leafs.forEach(n => {
    const { x, y } = g.node(n.id);
    const isLR = direction === 'LR';
    const laid = map.get(n.id)!;
    laid.position = { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 };
    laid.targetPosition = isLR ? Position.Left : Position.Top;
    laid.sourcePosition = isLR ? Position.Right : Position.Bottom;
  });

  // wrap group nodes around their children
  rawNodes.filter(n => n.type === 'group').forEach(group => {
    const pad = 16;
    const children = rawNodes.filter(c => c.parentNode === group.id);
    if (!children.length) return;

    const boxes = children.map(c => {
      const laid = map.get(c.id)!;
      return {
        x1: laid.position!.x,
        y1: laid.position!.y,
        x2: laid.position!.x + (laid.style?.minWidth || NODE_WIDTH),
        y2: laid.position!.y + (laid.style?.height || NODE_HEIGHT),
      };
    });

    const minX = Math.min(...boxes.map(b => b.x1)) - pad;
    const minY = Math.min(...boxes.map(b => b.y1)) - pad;
    const maxX = Math.max(...boxes.map(b => b.x2)) + pad;
    const maxY = Math.max(...boxes.map(b => b.y2)) + pad;

    const grp = map.get(group.id)!;
    grp.position = { x: minX, y: minY };
    grp.style = { ...grp.style, width: maxX - minX, height: maxY - minY };
  });

  return Array.from(map.values());
}

// Add default styles to nodes
export function addDefaultsToNodes(nodes: Array<NodeConfig>): Array<NodeConfig> {
  return nodes.map(node => ({
    ...node,
    style: {
      ...(node.type === 'info' ? NODE_DEFAULTS : {}),
      ...node.style,
    },
    data: {
      ...node.data,
      style: {
        ...(node.type === 'info' ? NODE_DEFAULTS : {}),
        ...node.data.style,
      },
    },
  }));
}
