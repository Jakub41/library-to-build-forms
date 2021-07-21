import { Grid, Radio, RadioGroup, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import Visible from '../../Visible';
import styles from './SingleSelect.styles';

const SingleSelect = ({ block, onChange, readOnly, classes }) => {
  block.answer = block.answer || '';
  block.freeTextAnswer = block.freeTextAnswer || '';

  const handleChange = useCallback(
    ({ target }) => {
      let updated = { ...block, answer: target.name, freeTextAnswer: '' };
      onChange(updated);
      return updated;
    },
    [block, onChange]
  );

  const onFreeTextChange = ({ target }) => {
    onChange({ ...block, answer: target.value, freeTextAnswer: target.value });
  };

  return (
    <RadioGroup value={block.answer} onChange={handleChange}>
      {block.items.map((item) => (
        <Grid container direction="row" key={item.key}>
          <Grid item>
            <Radio id={`${block.key}-${item.key}`} color="primary" name={item.key} className={classes.radio} value={item.key} disabled={readOnly} />
          </Grid>
          <Grid item className={classes.labelContainer}>
            <label htmlFor={`${block.key}-${item.key}`} className={classes.label}>
              <Typography variant="body1">{item.valueWithExplanations}</Typography>
            </label>
          </Grid>
        </Grid>
      ))}
      <Visible when={block.options.allowFreeText}>
        <Grid container direction="row" key="free-text">
          <Grid item>
            <Radio checked={block.freeTextAnswer.length > 0} color="primary" name="{free-text}" className={classes.radio} disabled={readOnly} />
          </Grid>
          <Grid item className={classes.textFieldContainer}>
            <TextField
              fullWidth={true}
              color="secondary"
              value={block.freeTextAnswer}
              variant="filled"
              onChange={onFreeTextChange}
              InputProps={{
                classes: {
                  root: classes.freeTextInputRoot,
                  input: classes.freeTextInput,
                },
              }}
              placeholder="Your Answer"
              disabled={readOnly}
            />
          </Grid>
        </Grid>
      </Visible>
    </RadioGroup>
  );
};

export default withStyles(styles)(SingleSelect);
