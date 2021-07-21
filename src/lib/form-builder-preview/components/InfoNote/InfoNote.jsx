import { Backdrop, Popover, withStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './InfoNote.styles';

const InfoNote = ({ isOpen, handleClose, anchorEl, classes }) => {
  const intl = useIntl();
  return (
    <Backdrop className={classes.backdrop} open={isOpen} onClick={handleClose}>
      <Popover
        id="helpful-message"
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.transparentPopover,
        }}
      >
        <div className={classes.noteContainer}>
          <div className={classes.arrowContainer}>
            <div className={classes.arrow}></div>
          </div>
          <div className={classes.messageContainer}>
            <div className={classes.message}>
              {intl.formatMessage({
                defaultMessage:
                  'Please click the help icon whenever you have a question!',
              })}
            </div>
            <div className={classes.buttonContainer}>
              <div className={classes.button}>
                {intl.formatMessage({
                  defaultMessage: 'Got it',
                })}
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </Backdrop>
  );
};

export default withStyles(styles)(InfoNote);
