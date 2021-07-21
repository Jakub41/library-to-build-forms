import { Button, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './NewMessagePrompt.styles';

const NewMessagePrompt = ({ classes, onOpen }) => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {intl.formatMessage({
          defaultMessage: 'You have gotten an answer to your question.',
        })}
      </Typography>
      <div className={classes.container}>
        <Button variant="text" onClick={onOpen}>
          <Typography variant="button" className={classes.button}>
            {intl.formatMessage({ defaultMessage: 'Go to answer' })}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NewMessagePrompt);
