import type { NodeProps } from '@xyflow/react';
import { GroupNode } from '@/components/labeled-group-node';

const InfoGroup = ({ selected, data }: NodeProps) => {
   // @ts-ignore: something
   return (
      <GroupNode
         selected={selected}
         label={data.label}
         position={'bottom-right'}
      />
   );
};

export default InfoGroup;
