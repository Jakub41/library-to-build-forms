import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './block-wrapper.styles';

const BlockWrapper = ({ title, draggableIndicator, rightHeader, children, classes }) => {
  return (
    <Paper className={classes.container}>
      <Grid container direction="column">
        <Grid item>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="overline" gutterBottom>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.draggableIndicatorContainer}>{draggableIndicator}</Box>
            </Grid>
            <Grid item xs={5}>
              <Grid container alignContent="space-between" alignItems="center">
                <Grid item xs></Grid>
                {rightHeader}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(BlockWrapper);
