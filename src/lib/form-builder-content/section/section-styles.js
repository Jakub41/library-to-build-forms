
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: '5px',
    paddingTop: 0,
    boxSizing: 'border-box'
  },
  dragAndDropButton: {
    transform: 'rotate(90deg)'
  },
  sectionContainer: {
    backgroundColor:  theme.palette.background.default
  },
  leftSideHeader: {
    paddingTop: theme.spacing(3),
    marginRight: theme.spacing(4),
  }
});