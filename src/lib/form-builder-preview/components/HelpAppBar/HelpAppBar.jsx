import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './HelpAppBar.styles';

const HelpAppBar = ({ classes, onClose }) => {
  const intl = useIntl();
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.appBarContainer}
    >
      <Grid item>
        <IconButton onClick={onClose}>
          <CloseIcon className={classes.whiteColor} />
        </IconButton>
      </Grid>
      <Grid item className={`${classes.noSelect} ${classes.help}`}>
        <Typography className={classes.whiteColor} variant="h6">
          {intl.formatMessage({
            defaultMessage: 'Help',
          })}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(HelpAppBar);
