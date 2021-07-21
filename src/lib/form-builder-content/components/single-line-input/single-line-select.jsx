import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import itemStyles from './item-input.styles';

const SingleLineSelect = ({ classes, label, error, name, value, onChange, tabIndex, type, options }) => {
  return (
    <TextField
      type={type}
      select
      placeholder={label}
      name={name}
      className={classes.container}
      onChange={onChange}
      value={value}
      error={error}
      InputProps={{ endAdornment: null, classes: { root: classes.input }, inputProps: { tabIndex } }}
    >
      {options.map((option) => (
        <MenuItem key={option.key} value={option.key}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const ItemSelectInput = withStyles(itemStyles)(SingleLineSelect);
