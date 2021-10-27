import * as React from 'react';

import { Layer } from 'react-konva';
import { ReactReduxContext, Provider, connect } from 'react-redux';

import { entitySettings as settings } from '../const';
import { entitySelectors } from '../store/flow-entity';
import { RootState, Size, FlowEntity } from '../types';

import FlexibleStage from './FlexibleStage';
import FlowCard from './FlowCard';

type StateProps = {
  stageSize: Size;
  entities: FlowEntity[];
};

const FlowEditor: React.FC<StateProps> = ({ stageSize, entities }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <FlexibleStage stageSize={stageSize}>
          <Provider store={store}>
            <Layer>
              {entities.map((entity) => (
                <FlowCard key={entity.id} entity={entity} />
              ))}
            </Layer>
          </Provider>
        </FlexibleStage>
      )}
    </ReactReduxContext.Consumer>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { flow } = state.entity;
  if (!flow) throw new Error();
  const root = state.entity.entities[flow.rootId];
  if (!root) throw new Error();
  const { tree } = root;
  if (!tree) throw new Error();
  const { stagePadding } = settings;
  const stageSize: Size = { width: tree.width + stagePadding * 2, height: tree.height + stagePadding * 2 };
  const entities = entitySelectors.selectAll(state);
  return { stageSize, entities };
};

export default connect(mapStateToProps)(FlowEditor);
