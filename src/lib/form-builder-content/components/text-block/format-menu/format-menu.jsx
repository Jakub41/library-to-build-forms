import { FormControl, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './format-menu.styles';

const FormatMenu = ({ classes, block, onChange }) => {
  const intl = useIntl();
  return (
    <FormControl className={classes.formControl}>
      <Select
        onChange={onChange}
        value={
          block.options.isHighlighted ? 'highlighted' : 'defaultFormatting'
        }
      >
        <MenuItem value={'defaultFormatting'}>
          {intl.formatMessage({ defaultMessage: 'Default formatting' })}
        </MenuItem>
        <MenuItem value={'highlighted'}>
          {intl.formatMessage({ defaultMessage: 'Highlighted' })}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(FormatMenu);
