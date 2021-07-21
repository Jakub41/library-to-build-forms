const styles = (theme) => ({
  gridItemContainer: {
    padding: theme.spacing(1),
    display: 'inline-flex',
  },
  answerPreview: {
    paddingTop: theme.spacing(2),
  },
  answerEndorsement: {
    paddingLeft: theme.spacing(1),
  },
  answerInfoContainer: {
    minWidth: 320,
  },
  textFieldShortText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
    lineHeight: 1.75,
    background: theme.palette.white,
  },
  infoIcon: {
    margin: theme.spacing(0, 1),
    width: 16,
    height: 16,
    opacity: 0.75
  }
});

export default styles;
