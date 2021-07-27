import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Times New Roman',
      'Calibri',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Poppins',
      'Open sans',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h4: {
      fontFamily: '"Poppins"',
      fontWeight: 500,
      fontSize: '24px',
      color: 'rgba(0,0,0,0.75)',
    },
    h6: {
      color: 'rgba(0,0,0,0.75)',
      fontWeight: 600,
      fontSize: '18px',
      fontFamily: '"Poppins"',
      letterSpacing: '0.14px',
      lineHeight: '24px',
    },
    subtitle1: {
      fontFamily: '"Open Sans"',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
    },
    body1: {
      fontFamily: '"Open Sans"',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '0.22px',
      lineHeight: '16px',
      color: 'rgba(0, 0, 0, 0.50)',
    },
    body2: {
      fontFamily: '"Open Sans"',
      fontWeight: 400,
      fontSize: '12px',
      letterSpacing: '0.4px',
      color: 'rgba(0, 0, 0, 0.50)',
    },
    caption: {
      fontFamily: '"Open Sans"',
      fontWeight: 400,
      fontSize: '12px',
      letterSpacing: '0.4px',
      color: 'rgba(0, 0, 0, 0.86)',
    },
    button: {
      fontFamily: '"Open Sans"',
      fontWeight: 700,
      fontSize: '14px',
      letterSpacing: '0.22px',
      lineHeight: '16px',
    },
  },
  palette: {
    type: 'light',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      hover: 'rgba(0, 0, 0, 0.04)',
      disabledOpacity: 0.3,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#0C91E9',
      dark: '#0C91E94D',
      contrastText: '#F8F8F8',
    },
    secondary: {
      main: '#005B86',
      contrastText: '#F8F8F8',
    },
    error: {
      main: '#B00020',
    },
    success: {
      main: '#05A200',
    },
    warning: {
      main: '#F3BB00',
    },
    confirmed: {
      main: '#00A76F',
    },
    inactive: {
      main: '#0000001F',
    },
    tonalOffset: 0.3,
  },
  background: {
    paper: '#fff',
    default: '#F8F8F8',
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiDivider: {
      root: {
        borderTop: 'thin solid rgba(237,237,237,1)',
        backgroundColor: undefined,
        height: undefined,
      },
    },
  },
});

export default theme;
