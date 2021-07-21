const styles = (theme) => ({
  wizardContainer: {
    backgroundColor: '#00A8EE14',
    padding: theme.spacing(2),
  },
  wizardMessageContainer: {
    paddingBottom: theme.spacing(3),
  },
  buttonsContainer: {
    padding: theme.spacing(1, 0),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  disabledButton: {
    textTransform: 'capitalize',
    color: '#0000001F',
  },
  enabledButton: {
    textTransform: 'capitalize',
    color: '#005B86',
  },
});

export default styles;
