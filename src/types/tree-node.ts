import { Point, Size, UUID } from '.';

type BaseEntity = { id: UUID; childIds: UUID[]; index: number; text: { primary: string; secondary: string } };

export type FlowType = 'root' | 'task' | 'switch' | 'case';
export type Direction = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; open: boolean; direction: Direction };
type SwitchState = BaseState & { type: 'switch'; selectedIndex?: string };
type EntityState = BaseState | SwitchState;

type RectAttributes = { tree?: Size; point?: Point };

export type FlowEntity = BaseEntity & EntityState & RectAttributes;
export type FlowNode = FlowEntity & { children: FlowNode[] };
export type TreeSettings = {
  stagePadding: number;
  indent: number;
  m: number;
  card: Size;
};
export type TreeRoot = { settings: TreeSettings; rootId?: UUID; focus?: UUID; dragging?: UUID };
