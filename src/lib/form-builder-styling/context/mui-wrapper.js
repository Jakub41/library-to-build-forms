import React, { useContext } from 'react';
import { ThemeContext } from './theme-provider';
import { ThemeProvider } from '@material-ui/core/styles';

function MuiWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MuiWrapper;
