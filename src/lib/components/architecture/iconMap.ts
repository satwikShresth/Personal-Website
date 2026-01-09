// Icon mapping from react-icons (FaReact, FaDocker, etc.) to lucide-svelte
import Code from '@lucide/svelte/icons/code';
import Box from '@lucide/svelte/icons/box';
import Database from '@lucide/svelte/icons/database';
import Server from '@lucide/svelte/icons/server';
import Search from '@lucide/svelte/icons/search';
import Cloud from '@lucide/svelte/icons/cloud';
import FileText from '@lucide/svelte/icons/file-text';
import BarChart from '@lucide/svelte/icons/bar-chart';
import Bell from '@lucide/svelte/icons/bell';
import Layers from '@lucide/svelte/icons/layers';
import Settings from '@lucide/svelte/icons/settings';
import HardDrive from '@lucide/svelte/icons/hard-drive';
import type { Component } from 'svelte';

export const iconMap: Record<string, Component> = {
  'react': Code,
  'docker': Box,
  'database': Database,
  'server': Server,
  'search': Search,
  'cloud': Cloud,
  'python': Code,
  'file': FileText,
  'filealt': FileText,
  'chart': BarChart,
  'chartline': BarChart,
  'bell': Bell,
  'stream': Layers,
  'cog': Settings,
  'settings': Settings,
  'storage': HardDrive,
};

export function getIcon(name: string): Component | null {
  return iconMap[name.toLowerCase()] || null;
}
