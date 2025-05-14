import { Handle, Position } from '@xyflow/react';
import { HoverCard, Portal } from '@chakra-ui/react';
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
    // @ts-ignore: something
    background: data.style?.background,
    // @ts-ignore: something
    border: data.style?.border ?? '2px solid #3B5BDB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore: something
    ...data.style,
  };

  return (
    <HoverCard.Root size="lg" positioning={{ placement: "top" }} openDelay={0}>
      <TooltipNode selected={selected}>
        {/* Incoming connections land here */}

        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#555', width: 10, height: 10 }}
        />

        <HoverCard.Trigger asChild>
          <TooltipTrigger style={triggerStyle}>
            {data?.label}
          </TooltipTrigger>
        </HoverCard.Trigger>

        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#555', width: 10, height: 10 }}
        />

        <TooltipContent position={Position.Top}>
          <Portal>
            <HoverCard.Positioner>
              <HoverCard.Content maxWidth="240px">
                <HoverCard.Arrow>
                  <HoverCard.ArrowTip />
                </HoverCard.Arrow>
                {data?.Card?.Header ?? <></>}
                {data?.Card?.Body ?? <></>}
                {data?.Card?.Footer ?? <></>}
              </HoverCard.Content>
            </HoverCard.Positioner>
          </Portal>
        </TooltipContent>
      </TooltipNode >
    </HoverCard.Root>
  );
};

export default InfoNode;
