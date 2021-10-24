import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';

import { flowPage } from '../const';
import { flowSelectors } from '../store/flow';
import { Flow, RootState } from '../types';

type StateProps = {
  flows: Flow[];
};

const FlowList: React.FC<StateProps> = ({ flows }) => {
  return (
    <Grid container sx={{ mt: 2 }} spacing={2}>
      {flows.map((flow) => (
        <Grid key={flow.id} item xs={6} md={4} lg={3}>
          <Card sx={{ minWidth: 200 }}>
            <CardActionArea component={Link} to={flowPage.url({ id: flow.id })} disableRipple>
              <CardContent sx={{ height: 200 }}>
                <Typography>{flow.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const flows = flowSelectors.selectAll(state);
  return { flows };
};

export default connect(mapStateToProps)(FlowList);
