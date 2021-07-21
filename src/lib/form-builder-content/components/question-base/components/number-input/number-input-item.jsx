import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useQuestionDataChangeManager } from '../../../../hooks';
import { NumberInput } from '../../../single-line-input/single-line-input';
import styles from './number-input-item.styles';

const NumberInputItem = ({ block, onChange, classes }) => {
  const { handleTextOptionChange } = useQuestionDataChangeManager(block, onChange);

  return (
    <Grid item className={classes.gridItemContainer}>
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        <Grid item>
          <NumberInput placeholder="Minimum value" type="number" name="minValue" value={block.options.minValue} onChange={handleTextOptionChange}
          error={Number(block.options?.minValue)>=Number(block.options?.maxValue)}
          />
        </Grid>
        <Grid item>
          <Divider flexItem className={classes.divider} />
        </Grid>
        <Grid item>
          <NumberInput placeholder="Maximum value" type="number" name="maxValue" value={block.options.maxValue} onChange={handleTextOptionChange}
          error={Number(block.options?.maxValue)<=Number(block.options?.minValue)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(NumberInputItem);
