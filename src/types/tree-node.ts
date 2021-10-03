type NodeIdBrand = string & { __nodeId: never };
type BaseTreeNode = { id: NodeIdBrand; index: number; childIds: string[] };

export type FlowType = 'task' | 'switch' | 'case';
export type CoordinateDirection = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; childrenDirection: CoordinateDirection };
type TaskState = BaseState & { type: 'task'; open: boolean };
type SwitchState = BaseState & { type: 'switch'; open: boolean; selectedIndex?: string };
type CaseState = BaseState & { type: 'case'; open: boolean };
type TreeState = TaskState | SwitchState | CaseState;

type NodeText = { text: { primary: string; secondary: string } };

type Point = { x: number; y: number };
type Size = { width: number; height: number };
type Rect = Point & Size;
type CoordinateAttributes = { self: Rect; group: Rect };

export type TreeNode = BaseTreeNode & TreeState & NodeText & CoordinateAttributes;
export type TreeRootState = { focus?: NodeIdBrand; dragging?: NodeIdBrand };
