// ArchitectureDiagram.tsx
import { useMemo } from 'react';
import {
  Background,
  Controls,
  ReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Container, HStack } from '@chakra-ui/react';
import InfoNode from './InfoNode';
import { addDefaultsToNodes, applyAutoLayout } from './utils';
import type { ArchitectureDiagramProps } from './types';
import { useColorMode } from "@/components/ui/color-mode";

// Register custom node types
const nodeTypes = { info: InfoNode };

const ArchitectureDiagram = ({
  nodes,
  edges,
  direction = 'TB',
  height = 1000,
  padding = 40,
  id,
}: ArchitectureDiagramProps) => {
  const processedNodes = useMemo(() => {
    const nodesWithDefaults = addDefaultsToNodes(nodes);
    return applyAutoLayout(nodesWithDefaults, edges, direction);
  }, [nodes, edges, direction, containerRef]);

  const { colorMode } = useColorMode();

  return (
    <Box h={height} p={padding} width="100%">
      <ReactFlow
        colorMode={colorMode}
        nodeTypes={nodeTypes}
        nodes={processedNodes}
        edges={edges}
        fitView
        panOnDrag={true}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Controls showInteractive={false} />
        <Background color="#aaa" gap={20} />
      </ReactFlow>
      <Container id={id}></Container>
    </Box>
  );
};

export default ArchitectureDiagram;
