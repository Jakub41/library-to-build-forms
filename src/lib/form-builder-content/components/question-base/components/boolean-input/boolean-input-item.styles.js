const styles = theme => ({
  gridItemContainer: {
    padding: theme.spacing(1),
    display: 'inline-flex'
  },
  formControlLabel: {
    paddingLeft: theme.spacing(4)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30ch',
    lineHeight: 1.75,
    background: theme.palette.white
  },
  textFieldShortText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
    lineHeight: 1.75,
    background: theme.palette.white
  }
});

export default styles;
