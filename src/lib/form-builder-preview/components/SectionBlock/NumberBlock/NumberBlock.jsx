import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './NumberBlock.styles';

const NumberBlock = ({ block, onChange, readOnly }) => {
  const handleChange = ({ target }) => {
    let newVal = parseInt(target.value);

    onChange({
      ...block,
      answer: newVal,
    });
  };

  return (
    <>
      <TextField
        fullWidth={true}
        variant="filled"
        color="secondary"
        label={`Number in range ${block.options.minValue} - ${block.options.maxValue}`}
        value={block.answer || ''}
        error={
          block.answer < block.options.minValue ||
          block.answer > block.options.maxValue
        }
        type="number"
        onChange={handleChange}
        disabled={readOnly}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(NumberBlock);
