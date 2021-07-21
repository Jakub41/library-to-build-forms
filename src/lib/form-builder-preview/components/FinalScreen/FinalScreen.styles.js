const styles = (theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  textContainer: {
    height: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  signatures: {
    padding: theme.spacing(6, 0),
  },
  signedByContainer: {
    padding: theme.spacing(0, 0),
    display: 'flex',
    flexDirection: 'row',
  },
  divider: {
    height: theme.spacing(8),
    margin: theme.spacing(0, 2),
    width: 2,
    backgroundColor: 'black',
  },
  iconContainer: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: theme.spacing(3),
    border: '2px solid black',
  },
  checkIcon: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    color: theme.palette.confirmed.main,
  },
  signedByTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: theme.spacing(0, 0, 0, 3),
  },
  button: {
    color: theme.palette.secondary.main,
  },
  disabledButton: {
    color: theme.palette.inactive.main,
  },
});

export default styles;
