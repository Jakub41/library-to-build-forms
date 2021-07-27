import React, { useRef } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './glossary-item.styles';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import useEditMode from '../../hooks/useEditMode';

const GlossaryItem = ({ classes, onRemove, onEdit, item, index }) => {
  const inputRef = useRef({});
  const { isInEditMode, toggleEditMode } = useEditMode(
    item.term === 'New term'
  );

  const showHide = (isInEditMode) => {
    return { display: isInEditMode ? 'none' : '' };
  };

  const renderTermInput = (term) => {
    return (
      <TextField
        multiline
        className={classes.textField}
        inputRef={(el) => (inputRef.current['glossaryKey'] = el)}
        autoFocus
        margin="none"
        name="glossaryKey"
        placeholder={'Add new glossary term'}
        defaultValue={term ? term : `New term ${index + 1}`}
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
      />
    );
  };
  const renderExplanationInput = (explanation) => {
    return (
      <TextField
        multiline
        className={classes.textField}
        inputRef={(el) => (inputRef.current['glossaryExplanation'] = el)}
        margin="none"
        error
        name="glossaryExplanation"
        placeholder={'Add explanation'}
        defaultValue={explanation}
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
      />
    );
  };

  return (
    <Grid container direction="row" className={classes.rowLayout} spacing={0}>
      <Grid item>
        <Typography
          className={classes.termTextStyle}
          variant="body1"
          style={showHide(isInEditMode)}
        >
          {item.term}
        </Typography>
      </Grid>
      <Grid item>{isInEditMode && renderTermInput(item.term)}</Grid>
      <Grid item>
        <Typography
          className={classes.explanationTextStyle}
          variant="body2"
          style={showHide(isInEditMode)}
        >
          {item.explanation}
        </Typography>
      </Grid>
      <Grid item>
        {isInEditMode && renderExplanationInput(item.explanation)}
      </Grid>
      <Grid item>
        {isInEditMode ? (
          <>
            <IconButton
              style={{ width: 24, height: 24, color: '#0C91E9' }}
              onClick={() => {
                const updated = {
                  term: inputRef.current['glossaryKey'].value,
                  explanation: inputRef.current['glossaryExplanation'].value,
                };
                onEdit(index, updated);
                toggleEditMode();
              }}
            >
              <DoneIcon fontSize="small" />
            </IconButton>
            <IconButton
              style={{ width: 24, height: 24, color: '#000000BF' }}
              onClick={() => {
                onRemove(index);
                toggleEditMode();
              }}
            >
              <ClearIcon fontSize="small" size="small" />
            </IconButton>
          </>
        ) : (
          <IconButton
            style={{ width: 24, height: 24, color: '#000000BF' }}
            onClick={toggleEditMode}
          >
            <MoreVertIcon fontSize="small" size="small" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(GlossaryItem);
