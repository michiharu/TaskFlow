import type { UUID } from './common';

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export type FlowType = 'root' | 'task' | 'switch' | 'case';

type BaseEntity = {
  id: UUID;
  childIds: UUID[];
  flowIndex: number;
  text: string;
};

export type Direction = 'vertical' | 'horizontal';
export type ReserveType = 'first' | 'next';
type BaseState = { type: FlowType; open: boolean; direction: Direction; reserved?: ReserveType };
export type AddablePoint = { parent: Parent; reserved: boolean; left: number; top: number };
export type DropZone = {
  parent: Parent;
  depth: number;
  from: UUID;
  reservedType: ReserveType;
  reserved: boolean;
} & Point &
  Size;
type RectAttributes = { point?: Point; tree?: Size; addable?: { points: AddablePoint[]; zones: DropZone[] } };
export type Parent = { id: UUID; direction: Direction; childIds: UUID[]; index: number };
export type FlowEntity = BaseEntity & BaseState & RectAttributes & { parent?: Parent };
export type FlowNode = FlowEntity & { children: FlowNode[] };

export type FlowEntitySettings = {
  stagePadding: number;
  indent: number;
  m: number;
  card: Size;
};
export type Status = 'selected' | 'editing' | 'dragging' | 'moving';
export type SelectStatus = { id: UUID; status: Status };

export type FlowState = {
  flow?: { id: UUID; title: string; rootId: UUID };
  selected?: SelectStatus;
  addablePoints: AddablePoint[];
  dropZones: DropZone[];
};
