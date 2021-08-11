import { ThemeProvider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
// import enMessages from './compiled-lang/en.json';
import FormBuilderPreview from './form-builder-preview';
import theme from './theme/theme';
import { getMessages } from '../languages.js';

async function bootstrapApplication() {
  const [messages] = await Promise.all([getMessages()]);

  ThemeContextFormPreview({ messages });
}

bootstrapApplication();

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
  console.log('MESSAGES 2', props.messages);
  return (
    <IntlProvider messages={props.messages} defaultLocale="en" locale="it">
      <ThemeProvider theme={theme}>
        <StyledFormPreview {...props} />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default ThemeContextFormPreview;
