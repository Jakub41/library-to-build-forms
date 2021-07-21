const styles = (theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
  appBar: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  appBarButtonContainer: {
    display: 'inline-block',
    paddingRight: theme.spacing(2),
  },
  appBarHeaderContainer: {
    display: 'inline-block',
    width: 'calc(100% - 42px)',
    verticalAlign: 'top',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menuButton: {
    width: '20px',
    height: '23px',
    margin: 0,
    padding: 0,
  },
  main: {
    flex: '1 1 auto',
  },
  subMain: {
    padding: theme.spacing(2, 0, 0, 0),
  },
  sectionContainerStyles: {
    paddingBottom: theme.spacing(6),
  },
  footer: {
    flex: '0 1',
    padding: theme.spacing(3, 2, 2, 2),
  },
});

export default styles;
