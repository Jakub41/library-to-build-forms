import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import useAutoFocus from "../../hooks/useAutoFocus";
import blockHeadingStyles from "./block-heading.styles";
import headingStyles from "./heading-input.styles";
import itemStyles from "./item-input.styles";
import noteStyles from "./note-input.styles";
import numberStyle from "./number-input.styles";
import questionnaireHeadingStyles from "./questionnaire-heading.styles";

const SingleLineInput = ({
  classes,
  label,
  placeholder,
  error,
  name,
  value,
  onChange,
  tabIndex,
  onFocus,
  onBlur,
  type,
  disabled,
  isFocused,
  lengthCap,
}) => {
  let { formRef } = useAutoFocus();
  const inputStyles = () => {
    if (type === "number") {
      return {
        InputLabelProps: {
          shrink: true,
        },
        InputProps: {
          disableUnderline: true,
          classes: { root: classes.input, focused: classes.focused },
          inputProps: { tabIndex },
        },
      };
    } else {
      return {
        InputProps: {
          endAdornment: null,
          classes: { root: classes.input, focused: classes.focused },
          inputProps: { tabIndex, ...(lengthCap && { maxLength: lengthCap }) },
        },
      };
    }
  };
  return (
    <TextField
      type={type}
      placeholder={label}
      label={placeholder}
      name={name}
      className={classes.container}
      onChange={onChange}
      value={value}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      {...inputStyles()}
      inputRef={isFocused ? formRef : null}
    />
  );
};

export const HeadingInput = withStyles(headingStyles)(SingleLineInput);
export const QuestionnaireHeadingInput = withStyles(questionnaireHeadingStyles)(
  SingleLineInput
);
export const BlockHeadingInput = withStyles(blockHeadingStyles)(
  SingleLineInput
);
export const NoteInput = withStyles(noteStyles)(SingleLineInput);
export const ItemInput = withStyles(itemStyles)(SingleLineInput);
export const NumberInput = withStyles(numberStyle)(SingleLineInput);
