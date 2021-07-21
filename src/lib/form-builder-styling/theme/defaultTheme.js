const defaultTheme = {
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
}
export default defaultTheme;