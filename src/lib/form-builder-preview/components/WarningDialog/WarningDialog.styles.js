const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    maxWidth: theme.spacing(36),
  },
  title: {},
  text: {
    marginTop: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(3),
  },
  action: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: theme.spacing(1),
  },
  button: {
    color: theme.palette.secondary.main,
  },
});

export default styles;
