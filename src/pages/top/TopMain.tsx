import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';

import { flowPage } from '../../const';
import { flowSelectors } from '../../store/flow';
import type { RootState } from '../../store/setup-store';
import type { Flow } from '../../types/flow';

type StateProps = {
  flows: Flow[];
};

const TopMainFC: React.FC<StateProps> = ({ flows }) => (
  <Box component="main" sx={{ p: 2 }}>
    <Grid container spacing={2}>
      {flows.map((flow) => (
        <Grid key={flow.id} item xs={6} md={4} lg={3}>
          <Card>
            <CardActionArea component={Link} to={flowPage.url({ id: flow.id })} disableRipple>
              <CardContent sx={{ height: 200 }}>
                <Typography>{flow.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const mapStateToProps = (state: RootState): StateProps => {
  const flows = flowSelectors.selectAll(state);
  return { flows };
};

export const TopMain = connect(mapStateToProps)(TopMainFC);
