import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import HelpAppBar from '../HelpAppBar/HelpAppBar';
import styles from './SelectionWizard.styles';

const SelectionWizard = ({
  classes,
  isTextSelected,
  onClose,
  onSelectionComplete,
  onSkip,
}) => {
  const intl = useIntl();
  return (
    <>
      <HelpAppBar onClose={onClose} />
      <Grid container direction="column" className={classes.wizardContainer}>
        <Grid
          item
          className={`${classes.noSelect} ${classes.wizardMessageContainer}`}
        >
          <Typography variant="body2">
            {intl.formatMessage({
              defaultMessage:
                'Click and hold to highlight text you want clarified.',
            })}
          </Typography>
        </Grid>
        <Grid item className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Button
              variant="text"
              onClick={onSelectionComplete}
              className={
                isTextSelected ? classes.enabledButton : classes.disabledButton
              }
              disabled={!isTextSelected}
            >
              {intl.formatMessage({ defaultMessage: 'Done' })}
            </Button>
            <Button
              onClick={onSkip}
              variant="text"
              className={
                isTextSelected ? classes.disabledButton : classes.enabledButton
              }
              disabled={isTextSelected}
            >
              {intl.formatMessage({ defaultMessage: 'Skip' })}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(SelectionWizard);
