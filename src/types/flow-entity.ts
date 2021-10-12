import { Point, Size, UUID } from '.';

export type FlowType = 'root' | 'task' | 'switch' | 'case';

type BaseEntity = { id: UUID; childIds: UUID[]; index: number; text: { primary: string; secondary: string } };

export type Direction = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; open: boolean; direction: Direction };
type SwitchState = BaseState & { type: 'switch'; selectedIndex?: string };
type EntityState = BaseState | SwitchState;
type RectAttributes = { tree?: Size; point?: Point };
type Parent = { id: UUID; direction: Direction };
export type FlowEntity = BaseEntity & EntityState & RectAttributes & { parent?: Parent };
export type FlowNode = FlowEntity & { children: FlowNode[] };
export type FlowEntitySettings = { stagePadding: number; indent: number; m: number; card: Size };
export type FlowRootState = { settings: FlowEntitySettings; rootId?: UUID; focus?: UUID; dragging?: UUID };
