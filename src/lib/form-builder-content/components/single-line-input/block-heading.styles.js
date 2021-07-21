const styles = (theme) => ({
  container: {
    backgroundColor: '#00000008',
    letterSpacing: 0,
    width: '100%',
  },
  input: {
    ...theme.typography.h6,
    paddingLeft: theme.spacing(2),
  },
  focused: {
    backgroundColor: '#0000001F',
  },
});

export default styles;
