import { createTheme, ThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import FormBuilder from '../form-builder';
import { getMessages } from '../lib/languages';

async function bootstrapApplication() {
  const [messages] = await Promise.all([getMessages()]);

  FormApp({ messages });
}

bootstrapApplication();

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/App',
};

export default config;

const FormApp = ({ messages }) => (
  <IntlProvider messages={messages} defaultLocale="en" locale="it">
    <ThemeProvider theme={defaultTheme}>
      <FormBuilder />
    </ThemeProvider>
  </IntlProvider>
);
export const App = FormApp.bind({});
