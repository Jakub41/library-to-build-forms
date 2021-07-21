import React, { useContext } from 'react';
import { ThemeContext } from './theme-provider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

function MuiWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}

export default MuiWrapper;
