import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import SectionMenu from '../section-menu';
import { HeadingInput } from '../single-line-input/single-line-input';
import styles from './page-header.styles';

const PageHeader = ({ section, index, onChange, onDelete, classes }) => {
  const onChangeTitleHandle = ({ target }) => {
    onChange({ ...section, [target.name]: target.value });
  };

  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="row"
        alignContent="space-between"
        className={classes.heading}
      >
        <Grid item xs={11}>
          <Typography variant="overline">Page {index + 1} Heading</Typography>
        </Grid>
        <Grid item xs={1}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <SectionMenu onDelete={() => onDelete(section)} />
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItemContainer}>
          <HeadingInput
            name="title"
            label="Add heading"
            onChange={onChangeTitleHandle}
            value={section.title}
            isFocused={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(PageHeader);
