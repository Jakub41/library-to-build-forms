import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Open sans',
      'Times New Roman',
      'Calibri',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '18px',
      letterSpacing: 0.14,
      lineHeight: '24px',
      color: 'rgba(0,0,0,0.75)',
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '24px',
      color: 'rgba(0,0,0,0.75)',
      letterSpacing: 0.15,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      lineHeight: '40px',
      fontSize: '24px',
      color: 'rgba(0,0,0,0.75)',
    },
    body1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: 0.5,
      lineHeight: '24px',
      color: 'rgba(0, 0, 0, 0.86)',
    },
    body2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: 0.22,
      lineHeight: '20px',
      color: 'rgba(0, 0, 0, 0.86)',
    },
    subtitle1: {
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
    },
    button: {
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '14px',
      color: 'rgba(0,0,0,0.75)',
      letterSpacing: 0.22,
      lineHeight: '16px',
    },
    overline: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: '12px',
      letterSpacing: 1.5,
      lineHeight: '16px',
      color: 'rgba(0,0,0,0.75)',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '12px',
      letterSpacing: 0.4,
      color: 'rgba(0, 0, 0, 0.50)',
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
