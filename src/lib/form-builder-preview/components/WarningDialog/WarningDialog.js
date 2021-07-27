import { Box, Button, Dialog, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './WarningDialog.styles';

const WarningDialog = ({ isOpen, onClose, onConfirm, classes }) => {
  const intl = useIntl();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
    >
      <Box className={classes.container}>
        <Box className={classes.title}>
          <Typography variant="subtitle1">
            {intl.formatMessage({ defaultMessage: 'Your question' })}
          </Typography>
        </Box>
        <Box className={classes.text}>
          <Typography variant="body1">
            {intl.formatMessage({
              defaultMessage:
                "You have questions that still haven't been answered",
            })}
          </Typography>
        </Box>
        <Box className={classes.actionsContainer}>
          <Box className={classes.action}>
            <Button onClick={onClose} className={classes.button}>
              <Typography variant="button">
                {intl.formatMessage({
                  defaultMessage: 'Send SMS when answered',
                })}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default withStyles(styles)(WarningDialog);
