import React from 'react';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { fontWeightList } from '../theme/constants';
import { FORM_WIDTH } from "../form-builder-styling";

const styles = (theme) => ({
  root: {
    width: FORM_WIDTH,
    margin: theme.spacing(0.5),
  },
  formControl: {
    minWidth: FORM_WIDTH,
  },
  menuListItems: {
    fontFamily: 'Open sans',
  },
});

const FontWeightChanger = ({ classes, fontWeight, onChange }) => {
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select className={classes.menuListItems} style={{ fontWeight: fontWeight }} value={fontWeight}
                onChange={onChange}>
          {Object.keys(fontWeightList).map((fw, index) => {
            return (
              <MenuItem className={classes.menuListItems} style={{ fontWeight: fw }} key={index} value={fw}>
                {fontWeightList[fw]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(FontWeightChanger);
