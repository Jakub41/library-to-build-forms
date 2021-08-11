import { createTheme, ThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import FormBuilder from '../form-builder';
import { getMessages } from '../lib/languages';

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/App',
};

export default config;

export const App = () => {
  const [messages, setMessages] = useState({})
  useEffect(async () => {
    setMessages(await getMessages('it'));
  }, [setMessages])
  return (<IntlProvider messages={messages} defaultLocale="en" locale="it">
    <ThemeProvider theme={defaultTheme}>
      <FormBuilder />
    </ThemeProvider>
  </IntlProvider>
  )
};
