const styles = (theme) => ({
  root: {
    padding: theme.spacing(2, 1),
  },
  disabled: {
    backgroundColor: 'rgb(0, 0, 0)',
    pointerEvents: 'none',
    opacity: 0.5,
  },
  textFieldShortText: {
    width: '30ch',
    lineHeight: 1.75,
    background: theme.palette.white,
  },
  answerEndorsement: {
    marginLeft: theme.spacing(1),
  },
});
export default styles;
