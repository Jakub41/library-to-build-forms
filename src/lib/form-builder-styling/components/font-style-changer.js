import React from 'react';
import { useTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { defaultFontFamilyList } from '../theme/constants';
import { FORM_WIDTH } from '../form-builder-styling';

const styles = (theme) => ({
  root: {
    width: FORM_WIDTH,
    margin: theme.spacing(0.5),
  },
  formControl: {
    minWidth: FORM_WIDTH,
  },
});

const FontStyleChanger = ({ classes, fontFamily, onChange }) => {
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select
          style={{
            fontFamily: fontFamily,
            fontWeight: theme.typography.fontWeightRegular,
          }}
          value={fontFamily}
          onChange={onChange}
        >
          {defaultFontFamilyList.map((ff, index) => (
            <MenuItem
              style={{
                fontFamily: ff,
                fontWeight: theme.typography.fontWeightRegular,
              }}
              key={index}
              value={ff}
            >
              {ff}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(FontStyleChanger);
