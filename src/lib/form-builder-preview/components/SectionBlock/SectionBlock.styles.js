import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    color: theme.palette.common.black,
  },
  bodyContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "& .tui-editor-contents p": {
      margin: 0
    }
  },
  highlight: {
    background: fade(theme.palette.primary.main, 0.04),
    color: theme.palette.common.black,
    '& .tui-editor-contents *': {
      color: theme.palette.common.black,
    },
  }
});

export default styles;