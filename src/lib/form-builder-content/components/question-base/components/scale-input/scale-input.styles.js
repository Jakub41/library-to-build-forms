const styles = (theme) => ({
  gridItemContainer: {
    padding: theme.spacing(1),
  },
  gridItemValue: {
    paddingRight: theme.spacing(2),
  },
  formControlLabel: {
    paddingLeft: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30ch',
    lineHeight: 1.75,
    background: theme.palette.white,
  },
  textFieldShortText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
    lineHeight: 1.75,
    background: theme.palette.white,
  },
  disabled: {
    opacity: 0.15,
    pointerEvents: 'none',
  },
});

export default styles;
