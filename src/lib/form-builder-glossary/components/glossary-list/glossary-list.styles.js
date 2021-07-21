const styles = (theme) => ({
  root: {
    width: '100%',
  },
  rowLayout: {
    maxHeight: 65,
    justifyContent: 'space-between',
    alignItems: 'baseline', // To be vertically aligned
  },
  gridContainer: {
    minHeight: '100vh',
    textAlign: 'center',
  },
  list: {
    outline: 0,
  },
  secondaryText: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    whiteSpace: 'pre-line',
  },

  textTitle: {
    display: 'inline-block',
  },
  textField: {
    minWidth: 220,
    minHeight: 48,
  },
});

export default styles;
