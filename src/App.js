import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import FormBuilder from './form-builder';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FormBuilder />;
    </ThemeProvider>
  );
}

export default App;
