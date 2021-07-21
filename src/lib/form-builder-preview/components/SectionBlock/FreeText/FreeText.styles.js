const styles = (theme) => ({
  backgroundRoot: {
    backgroundColor: '#0000000A',
    '&.Mui-focused': {
      backgroundColor: '#0000001F',
    },
  },
  multiLineInput: {
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(1.7, 2),
    backgroundColor: '#0000000A',
    '&.Mui-focused': {
      backgroundColor: '#0000001F',
    },
  },
  singleLineInput: {
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(1.7, 2),
  },
});

export default styles;
