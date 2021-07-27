import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './ResolvedPrompt.styles';

const ANSWER_YES = null;
const ANSWER_NO = 'User does not consider thread resolved';

const ResolvedPrompt = ({ classes, onConfirm, onCancel }) => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Typography variant="body1">
        {intl.formatMessage({
          defaultMessage: 'Did that resolve all your questions?',
        })}
      </Typography>
      <div className={classes.messageActionsContainer}>
        <span className={classes.messageActions}>
          <Button
            onClick={onCancel(ANSWER_NO)}
            className={classes.messageAction}
            variant="text"
          >
            {intl.formatMessage({
              defaultMessage: 'No',
            })}
          </Button>
          <Button
            onClick={onConfirm(ANSWER_YES)}
            className={classes.messageAction}
            variant="text"
          >
            {intl.formatMessage({
              defaultMessage: 'yes',
            })}
          </Button>
        </span>
      </div>
    </div>
  );
};

export default withStyles(styles)(ResolvedPrompt);
