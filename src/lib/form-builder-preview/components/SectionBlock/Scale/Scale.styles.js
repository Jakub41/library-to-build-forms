const styles = (theme) => ({
  root: {
    width: '100%',
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#0C91E94D',
      color: '#0C91E9',
      border: '1px solid #0C91E9',
      boxShadow: 'none'
    },
    '& .MuiButton-outlinedPrimary': {
      color: '#0C91E9',
      border: '1px solid #0C91E9'
    }
  },
  minTextContainer: {
    display: 'inline-block',
    width: 'calc(50% - 2px)'
  },
  maxTextContainer: {
    display: 'inline-block',
    width: 'calc(50% - 2px)',
    textAlign: 'right'
  },
  minMaxTextContainer: {
    paddingTop: '8px'
  }
});

export default styles;
