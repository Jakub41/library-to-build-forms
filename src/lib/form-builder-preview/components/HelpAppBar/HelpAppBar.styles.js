const styles = (theme) => ({
  appBarContainer: {
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.primary.main,
  },
  help: {
    padding: theme.spacing(0, 2),
  },
  whiteColor: {
    color: 'white',
  },
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
});

export default styles;
