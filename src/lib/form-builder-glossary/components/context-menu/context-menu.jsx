import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './context-menu.styles';

const initialState = {
  mouseX: null,
  mouseY: null,
  text: '',
};

const ContextMenu = ({ classes, children, handleContextMenuClick }) => {
  const intl = useIntl();
  const [state, setState] = React.useState(initialState);
  const selection = () => {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else {
      throw Error('Selection does not work');
    }

    if (text.length) {
      return text;
    }
  };
  const handleClick = (event) => {
    event.preventDefault();

    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      text: selection(),
    });
  };

  const handleHighLight = () => {
    handleContextMenuClick(state.text);
    setState(initialState);
  };

  const handleClose = () => {
    setState(initialState);
  };
  return (
    <>
      <Grid item className={classes.header}>
        <Typography variant="h6">
          {intl.formatMessage({ defaultMessage: 'Sections content' })}
        </Typography>
      </Grid>
      <div onContextMenu={handleClick} className={classes.root}>
        {children}
      </div>
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? {
                top: state.mouseY,
                left: state.mouseX,
              }
            : undefined
        }
      >
        <MenuItem id="noContextMenu" name="highlight" onClick={handleHighLight}>
          {intl.formatMessage({ defaultMessage: 'Add to glossary' })}
        </MenuItem>
      </Menu>
    </>
  );
};
export default withStyles(styles)(ContextMenu);
