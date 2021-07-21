const styles = (theme) => ({
  infoIcon: {
    float: 'right',
    right: theme.spacing(1.5),
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginTop: -theme.spacing(3),
    zIndex: 10,
  },
  dialogPaper: {
    height: '100%',
    overflow: 'none',
    '@media (min-width: 600px)': {
      height: 'calc(100% - 64px)'
    },
  },
  dialogTitle: {
    padding: 0,
  },
  dialogContent: {
    overflowY: 'auto',
  },
  multiLineInput: {
    borderRadius: theme.spacing(4),
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(2),
    backgroundColor: '#0000000A',
    '&.Mui-focused': {
      backgroundColor: '#0000001F',
    },
  },
});

export default styles;
