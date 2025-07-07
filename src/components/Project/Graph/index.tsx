// ArchitectureDiagram.tsx
import { useMemo } from 'react'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Badge, Box, Stack } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import InfoNode from './InfoNode'
import { addDefaultsToNodes, applyAutoLayout } from './utils'
import InfoGroup from './InfoGroup'
import type { ArchitectureDiagramProps } from './types'
import { useColorMode } from '@/components/ui/color-mode'

// Register custom node types
const nodeTypes = { info: InfoNode, labeledGroup: InfoGroup }

const ArchitectureDiagram = ({
  nodes,
  edges,
  direction = 'TB',
  height = 1000,
  padding = 40,
}: ArchitectureDiagramProps) => {
  const processedNodes = useMemo(() => {
    const nodesWithDefaults = addDefaultsToNodes(nodes)
    return applyAutoLayout(nodesWithDefaults, edges, direction)
  }, [nodes, edges, direction])

  const { colorMode } = useColorMode()

  return (
    <Box h={height} p={padding} width="100%" borderRadius={'lg'}>
      <ReactFlow
        colorMode={colorMode}
        nodeTypes={nodeTypes}
        // @ts-ignore: somthing
        nodes={processedNodes}
        // @ts-ignore: somthing
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
        style={{ borderRadius: '10px' }}
      >
        <Stack align={'flex-end'}>
          <Badge>
            {' '}
            <FiInfo /> Hover for more information{' '}
          </Badge>
        </Stack>
        <Controls showInteractive={false} />
        <Background color="#aaa" gap={20} />
      </ReactFlow>
    </Box>
  )
}

export default ArchitectureDiagram
