import { Handle, Position } from '@xyflow/react';
import { Card } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import type { NodeProps } from '@xyflow/react';
import {
  TooltipContent,
  TooltipNode,
  TooltipTrigger,
} from '@/components/tooltip-node';

const InfoNode = ({ selected, data }: NodeProps) => {
  const triggerStyle = {
    padding: '8px 12px',
    borderRadius: 8,
    minWidth: 150,
    background: data.style?.background,
    border: data.style?.border ?? '2px solid #3B5BDB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...data.style,
  };
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.getElementById('project-page-container'));
  }, []);

  return (
    <TooltipNode selected={selected}>
      {/* Incoming connections land here */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: 10, height: 10 }}
      />

      <TooltipTrigger style={triggerStyle}>
        {data?.label}
      </TooltipTrigger>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 10, height: 10 }}
      />

      <TooltipContent position={Position.Top}>
        {portalContainer && createPortal(
          (
            <Card.Root size={"sm"} overflow={"visible"}>
              <Card.Header>{data?.Card?.Header ?? <></>}</Card.Header>
              <Card.Body>{data?.Card?.Body ?? <></>} </Card.Body>
              <Card.Footer>{data?.Card?.Footer ?? <></>}</Card.Footer>
            </Card.Root>
          ),
          portalContainer
        )}
      </TooltipContent>
    </TooltipNode >
  );
};

export default InfoNode;
