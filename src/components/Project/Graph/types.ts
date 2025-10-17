// types.ts
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

// Base node types
export type NodeStyle = {
   padding?: number;
   border?: string;
   borderRadius?: number;
   minWidth?: number;
   background?: string;
   zIndex?: number;
   height?: number;
   textAlign?: 'left' | 'center' | 'right';
   [key: string]: any;
};

export type CardContent = {
   Header?: ReactNode;
   Body?: ReactNode;
   Footer?: ReactNode;
};

export type NodeData = {
   name?: string;
   label: ReactNode;
   info?: string;
   style?: NodeStyle;
   Card?: CardContent;
};

export type NodeConfig = {
   id: string;
   type: string;
   data: NodeData;
   position?: { x: number; y: number };
   height?: number;
   width?: number;
   parentId?: string;
   extent?: string;
   style?: NodeStyle;
};

// Edge type
export type EdgeConfig = {
   id: string;
   source: string;
   target: string;
   label?: string;
   markerEnd?: { type: string };
};

// Props for the architecture diagram
export type ArchitectureDiagramProps = {
   nodes: Array<NodeConfig>;
   edges: Array<EdgeConfig>;
   direction?: 'TB' | 'LR' | 'BT' | 'RL';
   height?: number | string;
   padding?: number;
   id?: any;
};

// Helper function type
export type LabelCreator = (Icon: IconType, text: string) => ReactNode;
