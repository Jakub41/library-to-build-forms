const styles = (theme) => ({
  pdfContainer: {
    margin: theme.spacing(0, 1),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1),
  },
  footer: {
    '& .MuiFab-root': {
      backgroundColor: '#0000000A',
      boxShadow: 'none',
      height: '40px!important',
      width: '40px!important'
    },
    '& .MuiFab-root.Mui-disabled': {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    '& .pages-count-container': {
      backgroundColor: '#0000000A',
      height: '32px',
      minWidth: '81px',
      textAlign: 'center',
      borderRadius: '5px'
    },
    '& .pages-count-container .MuiTypography-body2': {
      lineHeight: '32px',
    }
  }
});

export default styles;
