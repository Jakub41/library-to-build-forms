import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import styles from './Boolean.styles';

const YesNo = ({ classes, block, readOnly, onChange }) => {
  block.answer = block.answer || '';

  const setPositiveAnswer = () => {
    const blockCopy = { ...block };
    blockCopy.answer = block.options.trueValue;
    onChange(blockCopy);
  };

  const setNegativeAnswer = () => {
    const blockCopy = { ...block };
    blockCopy.answer = block.options.falseValue;
    onChange(blockCopy);
  };

  let positiveButtonAttributes = {};
  let negativeButtonAttributes = {};

  if (block.answer === block.options.trueValue) {
    positiveButtonAttributes = {
      variant: 'contained',
      color: 'primary',
    };
  } else if (block.answer === block.options.falseValue) {
    negativeButtonAttributes = {
      variant: 'contained',
      color: 'primary',
    };
  }

  return (
    <div className={classes.root}>
      <ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
        <Button onClick={setPositiveAnswer} disabled={readOnly} {...positiveButtonAttributes}>
          {block.options.trueValue}
        </Button>
        <Button onClick={setNegativeAnswer} disabled={readOnly} {...negativeButtonAttributes}>
          {block.options.falseValue}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(YesNo);
