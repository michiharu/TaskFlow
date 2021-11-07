import { UUID } from '.';

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export type FlowType = 'root' | 'task' | 'switch' | 'case';

type BaseEntity = { id: UUID; childIds: UUID[]; index: number; text: string };

export type Direction = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; open: boolean; direction: Direction };
type SwitchState = BaseState & { type: 'switch'; selectedIndex?: string };
type EntityState = BaseState | SwitchState;
type RectAttributes = { point?: Point; tree?: Size };
export type Parent = { id: UUID; direction: Direction; index: number };
export type FlowEntity = BaseEntity & EntityState & RectAttributes & { parent?: Parent };
export type FlowNode = FlowEntity & { children: FlowNode[] };

export type FlowEntitySettings = { stagePadding: number; indent: number; m: number; card: Size };
export type Status = 'selected' | 'editing' | 'dragging';
export type SelectedStatus = { id: UUID; status: Status; placeholderId?: UUID };
export type AddablePointOfEntity = { parent: Parent; left: number; top: number } & Point & Size;

export type FlowState = {
  flow?: {
    id: UUID;
    title: string;
    rootId: UUID;
  };
  selected?: SelectedStatus;
  addablePoints: AddablePointOfEntity[];
};
