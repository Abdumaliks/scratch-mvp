export interface Block {
  id: string;
  type: 'motion' | 'looks' | 'control' | 'events';
  action: string;
  value?: number;
  text?: string;
}

export interface SpriteState {
  x: number;
  y: number;
  visible: boolean;
  size: number;
  costume: string;
  rotation: number;
  message: string;
}

export interface Costume {
  id: number;
  emoji: string;
  name: string;
}

export interface BlockDefinition {
  type: 'motion' | 'looks' | 'control' | 'events';
  action: string;
  category: string;
  hasValue?: boolean;
  defaultValue?: number;
  unit?: string;
}
