import * as React from 'react';

import { Layer } from 'react-konva';
import { connect } from 'react-redux';

import { RootState } from '../store/setup-store';
import { treeSelectors } from '../store/tree/tree-slice';
import { Size } from '../types';
import { FlowEntity, TreeSettings } from '../types/tree-node';

import FlexibleStage from './FlexibleStage';
import FlowCard from './FlowCard';

type StateProps = {
  rootEntity: FlowEntity;
  entities: FlowEntity[];
  settings: TreeSettings;
};

const FlowRenderer: React.FC<StateProps> = ({ rootEntity, entities, settings }) => {
  const { tree } = rootEntity;
  if (!tree) throw new Error();
  const { stagePadding } = settings;
  const stageSize: Size = { width: tree.width + stagePadding * 2, height: tree.height + stagePadding * 2 };
  return (
    <FlexibleStage stageSize={stageSize}>
      <Layer>
        {entities.map((entity) => (
          <FlowCard key={entity.id} entity={entity} settings={settings} />
        ))}
      </Layer>
    </FlexibleStage>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { entities, rootId, settings } = state.tree;
  if (!rootId) throw new Error();
  return {
    rootEntity: entities[rootId] as FlowEntity,
    entities: treeSelectors.selectAll(state),
    settings,
  };
};

export default connect(mapStateToProps)(FlowRenderer);
