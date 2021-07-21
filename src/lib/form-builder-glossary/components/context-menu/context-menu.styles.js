const styles = (theme) => ({
  root: {
    cursor: 'context-menu',
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch',
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
});

export default styles;
