import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { TreeNode, TreeRootState } from '../types/tree-node';

import { RootState } from './setup-store';

const adapter = createEntityAdapter<TreeNode>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<TreeRootState>({});
export type FlowTreeEntityState = typeof initialState;

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
});

export default treeSlice;

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
