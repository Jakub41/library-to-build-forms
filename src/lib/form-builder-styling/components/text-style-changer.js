import React from 'react';
import { withStyles } from '@material-ui/styles';
import UnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import TextIcon from '@material-ui/icons/TextFormat';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { FORM_WIDTH } from '../form-builder-styling';

const styles = (theme) => ({
  root: {
    width: FORM_WIDTH,
  },
  button: {
    '& > .MuiIconButton > .MuiIconButton-colorPrimary': {
      color: '#000000de',
    },
  },
  selected: {
    color: 'black',
  },
});

const TextStyleChanger = ({
  classes,
  onClick,
  hasUnderline,
  hasItalic,
  colored,
}) => {
  const renderFormatUnderline = () => {
    return (
      <IconButton
        className={classes.button}
        onClick={(e) => onClick(e, { textDecoration: 'underline' })}
      >
        <UnderlinedIcon className={hasUnderline ? classes.selected : ''} />
      </IconButton>
    );
  };

  const renderFormatItalic = () => {
    return (
      <IconButton
        className={classes.button}
        onClick={(e) => onClick(e, { fontStyle: 'italic' })}
      >
        <ItalicIcon className={hasItalic ? classes.selected : ''} />
      </IconButton>
    );
  };
  //TODO render for Text color change
  const renderFormatTextColor = () => {
    return (
      <IconButton className={classes.button}>
        <TextIcon className={colored ? classes.selected : ''} />
      </IconButton>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" direction="row">
        <Grid item>{renderFormatItalic()}</Grid>
        <Grid item>{renderFormatUnderline()}</Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TextStyleChanger);
