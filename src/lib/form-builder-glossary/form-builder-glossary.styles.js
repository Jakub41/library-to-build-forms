
const styles = (theme) => ({
  root: {
    width: 'fit-content',
    margin: '0 auto',
  },
  container: {
    padding: theme.spacing(1, 2),
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'justify',
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '* > & hr': {
      margin: theme.spacing(1, 2),
      backgroundColor: theme.palette.divider,
    },
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    background: '2px solid ',
  },
  textArea: {
    ...theme.typography.body1,
    whiteSpace: 'pre-line',
  },
  gridRightItemContainer: {
    paddingRight: theme.spacing(1),
  },
  gridLeftItemContainer: {
    paddingLeft: theme.spacing(1),
  },
  gridItemContainer: {
    margin: theme.spacing(1),
  },
  header: {
    paddingBottom: theme.spacing(2),
  },
});

export default styles;
