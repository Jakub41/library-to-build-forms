const styles = (theme) => ({
  root: {
    borderRadius: 13,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
  },
  fromUser: {
    backgroundColor: '#00A8EE14',
  },
  fromRecipient: {
    backgroundColor: '#F8F8F8',
  },
  unread: {
    '& > p': {
      fontWeight: 'bold !important',
    },
  },
});

export default styles;
