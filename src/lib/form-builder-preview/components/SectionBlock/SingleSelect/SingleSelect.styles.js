const styles = (theme) => ({
  freeTextInputRoot: {
    width: '100%',
    backgroundColor: '#0000000A',
    '&.Mui-focused': {
      backgroundColor: '#0000001F',
    },
  },
  freeTextInput: {
    fontSize: theme.typography.body1.fontSize,
    padding: theme.spacing(1.7, 2),
  },
  radio: {
    paddingLeft: 0,
  },
  labelContainer: {
    padding: theme.spacing(1.5, 0),
  },
  label: {
    cursor: 'pointer',
  },
  textFieldContainer: {
    width: 'calc(100% - 42px)',
  },
  mandatoryAnswer: {
    color: 'red'
  },
});

export default styles;
