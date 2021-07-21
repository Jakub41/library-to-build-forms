import { Checkbox, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import Visible from '../../Visible';
import styles from './MultiSelect.styles';

const MultiSelect = ({ block, onChange, readOnly, classes }) => {
  block.answer = block.answer || [];
  block.freeTextAnswer = block.freeTextAnswer || '';

  const handleChange = useCallback(
    ({ target }) => {
      let answer = block.answer.concat();
      if (target.checked) {
        if (!answer.includes(target.name)) {
          answer.push(target.name);
        }
      } else {
        const index = block.answer.indexOf(target.name);
        answer.splice(index, 1);
      }

      if (answer.length === 0) {
        answer = null;
      }

      let updated = { ...block, answer };
      if (answer && !answer.includes('{free-text}')) {
        updated = { ...updated, freeTextAnswer: '' };
      }
      onChange(updated);
      return updated;
    },
    [block, onChange]
  );

  const onFreeTextChange = ({ target }) => {
    const updated = handleChange({
      target: { name: '{free-text}', checked: !!target.value },
    });
    onChange({ ...updated, freeTextAnswer: target.value });
  };

  return (
    <>
      {block.items.map((item) => (
        <Grid container direction="row" key={item.key}>
          <Grid item>
            <Checkbox
              id={`${block.key}-${item.key}`}
              color="primary"
              checked={block.answer.includes(item.key)}
              onChange={handleChange}
              name={item.key}
              className={classes.checkbox}
              disabled={readOnly}
            />
          </Grid>
          <Grid item className={classes.labelContainer}>
            <label htmlFor={`${block.key}-${item.key}`} className={classes.label}>
              <Typography variant="body1">{item.valueWithExplanations}</Typography>
            </label>
          </Grid>
        </Grid>
      ))}
      <Visible when={!!block.options?.allowFreeText}>
        <Grid container direction="row">
          <Grid item>
            <Checkbox
              color="primary"
              checked={block.answer.includes('{free-text}')}
              onChange={handleChange}
              name="{free-text}"
              className={classes.checkbox}
              disabled={readOnly}
            />
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
    </>
  );
};

export default withStyles(styles)(MultiSelect);
