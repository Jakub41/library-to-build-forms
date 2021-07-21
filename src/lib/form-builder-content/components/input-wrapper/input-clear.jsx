import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Clear } from '@material-ui/icons';

function InputClear(handleClickClean, propName) {
  const handleMouseDownClean = event => {
    event.preventDefault();
  };
  return ({
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => handleClickClean(propName)}
          onMouseDown={handleMouseDownClean}
          edge="end"
        >
          <Clear/>
        </IconButton>
      </InputAdornment>
    )
  })
}

export default InputClear;