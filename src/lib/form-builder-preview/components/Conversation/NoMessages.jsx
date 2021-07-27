import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';

const styles = (theme) => ({
  root: {
    backgroundColor: '#00A8EE14',
    padding: theme.spacing(2),
    borderBottom: '1px solid #00000029',
  },
});

const NoMessages = ({ classes }) => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {intl.formatMessage({
          defaultMessage: 'How can we help? Send us a question!',
        })}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(NoMessages);
