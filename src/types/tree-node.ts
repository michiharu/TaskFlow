import { Point, Size, UUID } from '.';

type BaseEntity = {
  id: UUID;
  childIds: UUID[];
  index: number;
  text: { primary: string; secondary: string };
};

export type FlowType = 'root' | 'task' | 'switch' | 'case';
export type Direction = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; direction: Direction };
type StartState = BaseState & { type: 'root'; open: true };
type TaskState = BaseState & { type: 'task'; open: boolean };
type SwitchState = BaseState & { type: 'switch'; open: boolean; selectedIndex?: string };
type CaseState = BaseState & { type: 'case'; open: boolean };
type EntityState = StartState | TaskState | SwitchState | CaseState;

type RectAttributes = {
  size?: { body: Size; tree: Size };
  point?: Point;
};

export type FlowEntity = BaseEntity & EntityState & RectAttributes;
export type FlowNode = FlowEntity & { children: FlowNode[] };
export type TreeSettings = { stagePadding: number; indent: number; m: number; body: Size };
export type TreeRoot = {
  settings: TreeSettings;
  rootId?: UUID;
  focus?: UUID;
  dragging?: UUID;
};
