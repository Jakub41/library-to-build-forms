import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useMemo } from 'react';
import { blockTypeNames, blockTypes } from '../../../constants';

const styles = (theme) => ({
  formControl: {
    minWidth: 250,
    maxHeight: 36,
  },
});

function SectionBlockTypeSelect({ classes, blockType, setBlockType }) {
  const handleChange = ({ target }) => {
    setBlockType(target.value);
  };

  const questionTypes = useMemo(
    () => [
      blockTypes.freetext,
      blockTypes.multiselect,
      blockTypes.yesno,
      blockTypes.singleselect,
      blockTypes.number,
      blockTypes.dropdown,
      blockTypes.scale,
    ],
    []
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="single-checkbox-label">Question type</InputLabel>
      <Select
        labelId="single-checkbox-label"
        value={blockType}
        onChange={handleChange}
        error={blockType === 'question'}
      >
        {questionTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {blockTypeNames[type]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(SectionBlockTypeSelect);
