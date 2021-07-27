import { ThemeProvider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import enMessages from '../../compiled-lang/en.json';
import FormBuilderPreview from './form-builder-preview';
import theme from './theme/theme';

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

const ThemeContextFormPreview = (props) => {
  const StyledFormPreview = withStyles(styles)(FormPreview);

  return (
    <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
      <ThemeProvider theme={theme}>
        <StyledFormPreview {...props} />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default ThemeContextFormPreview;
