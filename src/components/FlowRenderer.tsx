import * as React from 'react';

import { Layer } from 'react-konva';
import { connect } from 'react-redux';

import { RootState } from '../store/setup-store';
import { treeSelectors } from '../store/tree/tree-slice';
import { Size } from '../types';
import { FlowEntity } from '../types/tree-node';

import FlexibleStage from './FlexibleStage';
import FlowCard from './FlowCard';

type StateProps = {
  rootEntity: FlowEntity;
  entities: FlowEntity[];
  stagePadding: number;
};

const FlowRenderer: React.FC<StateProps> = ({ rootEntity, entities, stagePadding }) => {
  const { size } = rootEntity;
  if (!size) throw new Error();
  const stageSize: Size = { width: size.tree.width + stagePadding, height: size.tree.height + stagePadding };
  return (
    <FlexibleStage stageSize={stageSize}>
      <Layer>
        {entities.map((entity) => (
          <FlowCard key={entity.id} entity={entity} />
        ))}
      </Layer>
    </FlexibleStage>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { entities, rootId, settings } = state.tree;
  if (!rootId) throw new Error();

  const { stagePadding } = settings;
  return {
    rootEntity: entities[rootId] as FlowEntity,
    entities: treeSelectors.selectAll(state),
    stagePadding,
  };
};

export default connect(mapStateToProps)(FlowRenderer);
