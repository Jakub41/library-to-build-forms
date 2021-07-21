const styles = (theme) => ({
  root: {
    background: theme.palette.white,
    padding: theme.spacing(1),
  },
  gridItemContainer: {
    padding: theme.spacing(1),
    display: 'inline-flex',
  },
  gridItemContainerForHead: {
    padding: theme.spacing(1),
    display: 'inline-block',
    width: '100%',
  },
  formControlLabel: {
    paddingLeft: theme.spacing(4),
  },

  textFieldShortText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
    lineHeight: 1.75,
    background: theme.palette.white,
    '& .MuiInputBase-root': {
      '& .MuiFilledInput-input': {
        lineHeight: 1.75,
      },
    },
  },
});

export default styles;
