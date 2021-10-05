import { Rect } from '.';

export type NodeIdBrand = string & { __nodeId: never };
type BaseTreeNode = { id: NodeIdBrand; index: number; childIds: string[] };

export type FlowType = 'root' | 'task' | 'switch' | 'case';
export type CoordinateDirection = 'vertical' | 'horizontal';
type BaseState = { type: FlowType; childrenDirection: CoordinateDirection };

type StartState = BaseState & { type: 'root'; open: true };
type TaskState = BaseState & { type: 'task'; open: boolean };
type SwitchState = BaseState & { type: 'switch'; open: boolean; selectedIndex?: string };
type CaseState = BaseState & { type: 'case'; open: boolean };
type TreeState = StartState | TaskState | SwitchState | CaseState;

type NodeText = { text: { primary: string; secondary: string } };

type CoordinateAttributes = { rect: { self: Rect; tree: Rect } };

export type TreeNode = BaseTreeNode & TreeState & NodeText & CoordinateAttributes;
export type TreeRoot = { root?: NodeIdBrand; focus?: NodeIdBrand; dragging?: NodeIdBrand };
