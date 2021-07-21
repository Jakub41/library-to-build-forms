import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const styles = (theme) => ({
  root: {
    width: 'auto',
    background: theme.palette.common.white,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    margin: theme.spacing(2),
  },
  colorExampleRoot: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
  },

  gridItemContainer: {
    textAlignLast: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  gridItemColorBubble: {
    cursor: 'pointer',
  },
});

export const StyledButton = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default styles;
