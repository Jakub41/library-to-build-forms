import { createTheme, ThemeProvider } from '@material-ui/core';
import FormBuilder from '../form-builder';

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/App',
};

export default config;

const FormApp = () => (
  <ThemeProvider theme={defaultTheme}>
    <FormBuilder />
  </ThemeProvider>
);
export const App = FormApp.bind({});
