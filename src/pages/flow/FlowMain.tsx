import * as React from 'react';

import { styled } from '@mui/system';
import { Layer } from 'react-konva';
import { Html } from 'react-konva-utils';
import { Provider, ReactReduxContext, connect } from 'react-redux';

import { Box, ThemeProvider } from '@mui/material';

import AddFlowButton from '../../components/AddFlowButton';
import FlexibleStage from '../../components/FlexibleStage';
import FlowCard from '../../components/FlowCard';
import { cardActionTheme, entitySettings as settings } from '../../const';
import { entitySelectors } from '../../store/flow-entity';
import type { AddablePoint, DropZone, FlowEntity, SelectStatus, Size } from '../../types/flow-entity';
import type { RootState } from '../../types/store';

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
  selected?: SelectStatus;
  addablePoints: AddablePoint[];
  dropZones: DropZone[];
};

const FlowMainFC: React.FC<StateProps> = ({ stageSize, entities, selected, addablePoints, dropZones }) => (
  <MainComponent>
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <FlexibleStage stageSize={stageSize}>
          <Provider store={store}>
            <Layer>
              {entities.map((entity) => (
                <FlowCard key={entity.id} entity={entity} dropZones={dropZones} selectedStatus={selected} />
              ))}
              <Html>
                <ThemeProvider theme={cardActionTheme}>
                  <Provider store={store}>
                    <Box sx={{ width: 0, height: 0, position: 'relative' }}>
                      {(!selected || selected.status === 'selected') &&
                        addablePoints.map((p) => <AddFlowButton key={`${p.left}:${p.top}`} point={p} />)}
                    </Box>
                  </Provider>
                </ThemeProvider>
              </Html>
            </Layer>
          </Provider>
        </FlexibleStage>
      )}
    </ReactReduxContext.Consumer>
  </MainComponent>
);

const mapStateToProps = (state: RootState): StateProps => {
  const { flow, selected, addablePoints, dropZones } = state.entity;
  if (!flow) throw new Error();
  const root = state.entity.entities[flow.rootId];
  if (!root) throw new Error();
  const { tree } = root;
  if (!tree) throw new Error();
  const { stagePadding } = settings;
  const stageSize: Size = {
    width: tree.width + stagePadding * 2,
    height: tree.height + stagePadding * 2,
  };
  const entities = entitySelectors.selectAll(state);
  return { stageSize, entities, selected, addablePoints, dropZones };
};

export const FlowMain = connect(mapStateToProps)(FlowMainFC);
