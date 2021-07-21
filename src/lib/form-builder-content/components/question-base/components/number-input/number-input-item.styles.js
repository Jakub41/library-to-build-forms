const styles = theme => ({
  gridItemContainer: {
    padding: theme.spacing(1)
  },
  textFieldNumber: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
    lineHeight: 1.75,
    background: theme.palette.white,
    '& .MuiInputBase-root': {
      '& .MuiFilledInput-input': {
        lineHeight: 1.75
      }
    }
  },
  divider: {
    marginLeft: '8px',
    marginRight: '8px',
    background: '2px solid '
  }
});

export default styles;
