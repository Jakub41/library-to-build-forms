import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import useAutoFocus from '../../hooks/useAutoFocus';
import useDebounce from '../../hooks/useDebounce';
import multilineStyles from './multi-line-input.styles';

const Input = ({ classes, label, placeholder, error, name, value, onChange, tabIndex, onFocus, onBlur, type, disabled, isFocused, rows, lengthCap }) => {
  const { value: currentValue, setValueWithTarget } = useDebounce(value, 200, { onChangeWithTarget: onChange });

  let { formRef } = useAutoFocus();
  const inputStyles = () => {
    return {
      multiline: true,
      rows,
      InputProps: {
        classes: { root: classes.input, focused: classes.focused },
        inputProps: { tabIndex, ...(lengthCap && { maxLength: lengthCap }) },
      },
    };
  };

  return (
    <TextField
      type={type}
      placeholder={placeholder}
      label={label}
      name={name}
      className={classes.container}
      onChange={setValueWithTarget}
      value={currentValue}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      {...inputStyles()}
      inputRef={isFocused ? formRef : null}
    />
  );
};

export const MultilineInput = withStyles(multilineStyles)(Input);
