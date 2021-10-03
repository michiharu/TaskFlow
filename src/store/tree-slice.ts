import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { uuid4 } from '../funcs/utils';
import { NodeIdBrand, TreeNode, TreeRoot } from '../types/tree-node';

import { RootState } from './setup-store';

const adapter = createEntityAdapter<TreeNode>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<TreeRoot>({});
export type TreeEntityState = typeof initialState;

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    createTree(state) {
      // reset state
      adapter.removeAll(state);
      state.focus = undefined;
      state.dragging = undefined;

      const rootId = uuid4() as NodeIdBrand;
      const childId = uuid4() as NodeIdBrand;

      state.root = rootId;

      // TODO: calc coordinate attributes
      const root: TreeNode = {
        id: rootId,
        index: 0,
        childIds: [childId],
        type: 'root',
        childrenDirection: 'vertical',
        open: true,
        text: { primary: '', secondary: '' },
        rect: {
          self: { x: 0, y: 0, width: 0, height: 0 }, // dummy
          tree: { x: 0, y: 0, width: 100, height: 100 }, // dummy
        },
      };
      const child: TreeNode = {
        id: childId,
        index: 0,
        childIds: [childId],
        type: 'task',
        childrenDirection: 'vertical',
        open: false,
        text: { primary: '', secondary: '' },
        rect: {
          self: { x: 20, y: 20, width: 60, height: 20 }, // dummy
          tree: { x: 20, y: 20, width: 60, height: 20 }, // dummy
        },
      };
      adapter.setAll(state, [root, child]);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
