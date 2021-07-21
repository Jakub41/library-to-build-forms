const styles = (theme) => ({
  container: {
    backgroundColor: '#00000008',
    letterSpacing: 0,
    width: '100%',
  },
  input: {
    fontWeight: 'normal',
    fontSize: '16px',
    paddingLeft: theme.spacing(2),
    '&.Mui-focused': {
      backgroundColor: '#0000001F',
    },
  },
  focused: {
    backgroundColor: '#0000001F',
  },
});

export default styles;
