import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useDebounce from '../../../../hooks/useDebounce';
import useQuestionDataChangeManager from '../../../../hooks/useQuestionDataChangeManager';
import { ItemInput } from '../../../single-line-input/single-line-input';
import { ItemSelectInput } from '../../../single-line-input/single-line-select';
import styles from './scale-input.styles';

const BooleanInput = ({ block, onChange, classes }) => {
  const intl = useIntl();
  const { handleTextOptionChange, useRange } = useQuestionDataChangeManager(
    block,
    onChange
  );
  const [isDirty, setIsDirty] = useState({ min: false, max: false });
  const {
    value: minValueText,
    setValueWithTarget: setMinValueText,
  } = useDebounce(block.options.minValueText, 200, {
    onChangeWithTarget: handleTextOptionChange,
  });
  const {
    value: maxValueText,
    setValueWithTarget: setMaxValueText,
  } = useDebounce(block.options.maxValueText, 200, {
    onChangeWithTarget: handleTextOptionChange,
  });

  const options = useRange(10, 1).map((x) => ({ key: x, value: x }));
  return (
    <Grid item className={classes.gridItemContainer}>
      <Grid container>
        <Grid item className={classes.gridItemContainer}>
          <ItemSelectInput
            label={intl.formatMessage({
              defaultMessage: 'Min value',
            })}
            name="minValue"
            value={block.options.minValue}
            onChange={handleTextOptionChange}
            options={options}
            error={block.options.maxValue < block.options.minValue}
          />
        </Grid>
        <Grid item className={classes.gridItemContainer}>
          <ItemInput
            label={intl.formatMessage({
              defaultMessage: 'Min value text',
            })}
            name="minValueText"
            error={!minValueText.length && isDirty.min}
            value={minValueText}
            onChange={(event) => {
              setIsDirty({ ...isDirty, min: true });
              setMinValueText(event);
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={classes.gridItemContainer}>
          <ItemSelectInput
            label={intl.formatMessage({
              defaultMessage: 'Max value',
            })}
            name="maxValue"
            value={block.options.maxValue}
            onChange={handleTextOptionChange}
            options={options}
            error={block.options.maxValue < block.options.minValue}
          />
        </Grid>
        <Grid item className={classes.gridItemContainer}>
          <ItemInput
            label={intl.formatMessage({
              defaultMessage: 'Max value text',
            })}
            name="maxValueText"
            error={!maxValueText.length && isDirty.max}
            value={maxValueText}
            onChange={(event) => {
              setIsDirty({ ...isDirty, min: true });
              setMaxValueText(event);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BooleanInput);
