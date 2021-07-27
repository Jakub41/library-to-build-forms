import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { blockTypeNames, blockTypes } from '../../../constants';

const styles = (theme) => ({
  formControl: {
    minWidth: 250,
    maxHeight: 36,
  },
});

function MediaBlockTypeSelect({ classes, blockType, setBlockType }) {
  const intl = useIntl();
  const handleChange = ({ target }) => {
    setBlockType(target.value);
  };

  const mediaTypes = useMemo(
    () => [
      blockTypes.video,
      blockTypes.audio,
      blockTypes.pdf,
      blockTypes.image,
    ],
    []
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="single-checkbox-label">Pick Media Type</InputLabel>
      <Select
        labelId="single-checkbox-label"
        error={blockType === 'media'}
        value={blockType}
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <em>
            {intl.formatMessage({
              defaultMessage: 'Media type',
            })}
          </em>
        </MenuItem>
        {mediaTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {blockTypeNames[type]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles, { withTheme: true })(MediaBlockTypeSelect);
