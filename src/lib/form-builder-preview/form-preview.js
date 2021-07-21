import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import FormBuilderPreview from './form-builder-preview';

const styles = () => ({
  errorMessage: {
    width: '100%',
    textAlign: 'center',
  },
});

const FormPreview = ({ classes, ...props }) => {
  const intl = useIntl();
  if (!props?.initialData?.pages?.length) {
    return (
      <Typography className={classes.errorMessage}>
        {intl.formatMessage({
          defaultMessage: 'Please add pages to view your form',
        })}{' '}
      </Typography>
    );
  }

  return <FormBuilderPreview {...props} />;
};

export default withStyles(styles)(FormPreview);
