import * as React from 'react';

import { styled } from '@mui/system';
import { Layer } from 'react-konva';
import { ReactReduxContext, Provider, connect } from 'react-redux';

import FlexibleStage from '../../components/FlexibleStage';
import FlowCard from '../../components/FlowCard';
import { entitySettings as settings } from '../../const';
import { entitySelectors } from '../../store/flow-entity';
import { RootState, Size, FlowEntity, UUID } from '../../types';

const MainComponent = styled('main')(({ theme: { breakpoints } }) => ({
  // https://github.com/mui-org/material-ui/issues/10076#issuecomment-361232810
  // toolbar: {
  //   minHeight: 56,
  //   [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
  //     minHeight: 48,
  //   },
  //   [breakpoints.up('sm')]: {
  //     minHeight: 64,
  //   },
  // },
  height: 'calc(100vh - 56px)',
  [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
    height: 'calc(100vh - 48px)',
  },
  [breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
  },
}));

type StateProps = {
  stageSize: Size;
  entities: FlowEntity[];
  selected?: UUID;
};

const FlowMainFC: React.FC<StateProps> = ({ stageSize, entities, selected }) => {
  return (
    <MainComponent>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <FlexibleStage stageSize={stageSize}>
            <Provider store={store}>
              <Layer>
                {entities.map((entity) => (
                  <FlowCard key={entity.id} entity={entity} selected={entity.id === selected} />
                ))}
              </Layer>
            </Provider>
          </FlexibleStage>
        )}
      </ReactReduxContext.Consumer>
    </MainComponent>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { flow, selected } = state.entity;
  if (!flow) throw new Error();
  const root = state.entity.entities[flow.rootId];
  if (!root) throw new Error();
  const { tree } = root;
  if (!tree) throw new Error();
  const { stagePadding } = settings;
  const stageSize: Size = { width: tree.width + stagePadding * 2, height: tree.height + stagePadding * 2 };
  const entities = entitySelectors.selectAll(state);
  return { stageSize, entities, selected };
};

export const FlowMain = connect(mapStateToProps)(FlowMainFC);
