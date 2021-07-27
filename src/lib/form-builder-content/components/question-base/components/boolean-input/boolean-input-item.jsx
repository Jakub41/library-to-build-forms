import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import { useQuestionDataChangeManager } from '../../../../hooks';
import useDebounce from '../../../../hooks/useDebounce';
import { ItemInput } from '../../../single-line-input/single-line-input';
import styles from './boolean-input-item.styles';

const BooleanInputItem = ({ block, onChange, classes }) => {
  const intl = useIntl();
  const { handleCheckboxOptionChange, handleTextOptionChange } =
    useQuestionDataChangeManager(block, onChange);
  const { value: trueValue, setValueWithTarget: setTrueValue } = useDebounce(
    block.options.trueValue,
    200,
    { onChangeWithTarget: handleTextOptionChange }
  );
  const { value: falseValue, setValueWithTarget: setFalseValue } = useDebounce(
    block.options.falseValue,
    200,
    { onChangeWithTarget: handleTextOptionChange }
  );

  return (
    <>
      <Grid item className={classes.gridItemContainer}>
        <ItemInput name="trueValue" value={trueValue} onChange={setTrueValue} />
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={block.options?.trueValueIsMandatory}
              disabled={
                block.options?.falseValueIsMandatory || block.options?.optional
              }
              onChange={handleCheckboxOptionChange}
              color="primary"
              name="trueValueIsMandatory"
            />
          }
          label={
            <Typography variant="body1" noWrap>
              {intl.formatMessage({
                defaultMessage: 'Required answer to proceed',
              })}
            </Typography>
          }
          labelPlacement="end"
        />
      </Grid>

      <Grid item className={classes.gridItemContainer}>
        <ItemInput
          name="falseValue"
          value={falseValue}
          onChange={setFalseValue}
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={block.options?.falseValueIsMandatory}
              disabled={
                block.options?.trueValueIsMandatory || block.options?.optional
              }
              onChange={handleCheckboxOptionChange}
              color="primary"
              name="falseValueIsMandatory"
            />
          }
          label={
            <Typography variant="body1" noWrap>
              {intl.formatMessage({
                defaultMessage: 'Required answer to proceed',
              })}
            </Typography>
          }
          labelPlacement="end"
        />
      </Grid>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(BooleanInputItem);
