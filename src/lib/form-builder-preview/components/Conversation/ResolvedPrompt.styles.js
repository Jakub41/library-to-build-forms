const styles = (theme) => ({
  root: {
    borderRadius: 13,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    backgroundColor: '#00A8EE14',
  },
  messageActionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  messageActions: {
    flexDirection: 'row-reverse',
  },
  messageAction: {
    textTransform: 'capitalize',
    color: theme.palette.secondary.main,
  },
});

export default styles;
