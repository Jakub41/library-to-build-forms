const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    paddingTop: 0,
    boxSizing: 'border-box',
  },
  appBar: {
    borderRadius: 3,
  },
  headerTabsContainer: {
    display: 'inline-block',
  },
  headerButtonsContainer: {
    display: 'inline-block',
    float: 'right',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
});

export default styles;
