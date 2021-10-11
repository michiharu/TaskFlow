import * as React from 'react';

import { Layer } from 'react-konva';
import { ReactReduxContext, Provider, connect } from 'react-redux';

import { flowEntitySelectors } from '../store/flow-entity/slice';
import { RootState } from '../store/setup-store';
import { Size } from '../types';
import { FlowEntity, EntitySettings } from '../types/flow-entity';

import FlexibleStage from './FlexibleStage';
import FlowCard from './FlowCard';

type StateProps = {
  stageSize: Size;
  entities: FlowEntity[];
  settings: EntitySettings;
};

const FlowRenderer: React.FC<StateProps> = ({ stageSize, entities, settings }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <FlexibleStage stageSize={stageSize}>
          <Provider store={store}>
            <Layer>
              {entities.map((entity) => (
                <FlowCard key={entity.id} entity={entity} settings={settings} />
              ))}
            </Layer>
          </Provider>
        </FlexibleStage>
      )}
    </ReactReduxContext.Consumer>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { rootId, settings } = state.flowEntity;
  if (!rootId) throw new Error();
  const root = state.flowEntity.entities[rootId];
  if (!root) throw new Error();
  const { tree } = root;
  if (!tree) throw new Error();
  const { stagePadding } = settings;
  const stageSize: Size = { width: tree.width + stagePadding * 2, height: tree.height + stagePadding * 2 };
  const entities = flowEntitySelectors.selectAll(state);
  return { stageSize, entities, settings };
};

export default connect(mapStateToProps)(FlowRenderer);
