import { createTheme, ThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import enMessages from '../compiled-lang/en.json';
import FormBuilder from '../form-builder';

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/App',
};

export default config;

const FormApp = () => (
  <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
    <ThemeProvider theme={defaultTheme}>
      <FormBuilder />
    </ThemeProvider>
  </IntlProvider>
);
export const App = FormApp.bind({});
