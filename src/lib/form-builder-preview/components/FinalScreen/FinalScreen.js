import { Box, Button, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/styles';
import { uniqBy } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { blockTypes } from '../../../constants';
import Visible from '../../../form-builder-content/components/visible';
import styles from './FinalScreen.styles';

const getSignedMessage = (signature, currentUser) => {
  if (signature.answer) {
    if (signature.user.id === currentUser.id) {
      return 'Signed by you';
    } else if (signature.recipient?.role !== 'COUNTERSIGNEE') {
      return `Signed by ${signature.user.name}`;
    } else {
      return 'Countersigned';
    }
  } else {
    if (signature.recipient?.role === 'COUNTERSIGNEE') {
      return 'Countersigned';
    } else {
      return `Signed by ${signature.recipient?.role?.toLowerCase()}`;
    }
  }
};

const getDate = (signatureTimestamp) => {
  return new Date(Date.parse(signatureTimestamp)).toLocaleString();
};

const FinalScreen = ({
  signaturePage,
  currentUser,
  onPdfDownload,
  classes,
}) => {
  const intl = useIntl();
  const signatures = useMemo(() => {
    const signatureBlocks = signaturePage?.blocks?.filter(
      (x) => x.type === blockTypes.signature
    );
    return uniqBy(signatureBlocks, 'signature.user.id') || [];
  }, [signaturePage]);

  const handlePdfDownload = useCallback(
    () => onPdfDownload && onPdfDownload(),
    [onPdfDownload]
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.textContainer}>
        <Typography variant="body1" className={classes.paragraph}>
          {intl.formatMessage({
            defaultMessage: 'Thank you for your time!',
          })}
        </Typography>
      </Box>
      <Box className={classes.signatures}>
        {signatures.map((signature, index) => (
          <>
            <Box key={signature.key} className={classes.signedByContainer}>
              <Box className={classes.iconContainer}>
                <Visible when={signature.answer}>
                  <CheckCircleIcon className={classes.checkIcon} />
                </Visible>
              </Box>
              <Box className={classes.signedByTextContainer}>
                <Typography variant={signature.answer ? 'caption' : 'body2'}>
                  {getSignedMessage(signature, currentUser)}
                </Typography>
                <Visible when={signature.answerTimestamp}>
                  <Typography variant="body2">
                    {getDate(signature.answerTimestamp)}
                  </Typography>
                </Visible>
              </Box>
            </Box>
            <Visible when={index < signatures.length - 1}>
              <Box className={classes.divider}>&nbsp;</Box>
            </Visible>
          </>
        ))}
      </Box>
      <Box className={classes.downloadButtonContainer}>
        <Button onClick={handlePdfDownload}>
          <Typography variant="button" className={classes.button}>
            {intl.formatMessage({
              defaultMessage: 'Download PDF',
            })}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(FinalScreen);
