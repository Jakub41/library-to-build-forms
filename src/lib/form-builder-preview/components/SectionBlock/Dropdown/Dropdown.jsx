import { FormControl, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import styles from './Dropdown.styles';

const Dropdown = ({ block, onChange, readOnly, classes }) => {
  block.answer = block.answer || '';

  const setAnswer = useCallback(
    (answer) => {
      const updated = { ...block, answer };
      onChange(updated);
    },
    [block, onChange]
  );

  return (
    <FormControl color="secondary" fullWidth={true} variant="filled">
      <Select
        value={block.answer}
        onChange={({ target }) => setAnswer(target.value)}
        inputProps={{ classes: { root: classes.inputRoot } }}
        disabled={readOnly}
      >
        {block.items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.valueWithExplanations}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(Dropdown);
