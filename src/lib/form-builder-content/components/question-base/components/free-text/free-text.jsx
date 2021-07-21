import {
  Checkbox,
  FormControlLabel,
  Typography,
  withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { textLengthCap } from '../../../../../constants';
import { useQuestionDataChangeManager } from '../../../../hooks';
import { MultilineInput } from '../../../multi-line-input/multi-line-input';
import { ItemInput } from '../../../single-line-input/single-line-input';
import styles from './free-text.styles';

const FreeText = ({ classes, block, onChange }) => {
  const {
    handleCheckboxOptionChange,
    handleTextOptionChange,
  } = useQuestionDataChangeManager(block, onChange);
  const intl = useIntl();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="flex-start"
      className={classes.root}
    >
      <Grid item xs={4}>
        {block.options?.isMultiLine ? (
          <MultilineInput
            name="placeholder"
            value={block.options.placeholder}
            onChange={handleTextOptionChange}
            isMultiline={true}
            lengthCap={textLengthCap.multiLines}
            rows={2}
          />
        ) : (
          <ItemInput
            name="placeholder"
            value={block.options.placeholder}
            onChange={handleTextOptionChange}
            lengthCap={textLengthCap.singleLine}
          />
        )}
      </Grid>
      <Grid item xs={8}>
        <FormControlLabel
          className={classes.answerEndorsement}
          control={
            <Checkbox
              checked={block.options?.isMultiLine}
              onChange={handleCheckboxOptionChange}
              name="isMultiLine"
              color="primary"
            />
          }
          label={
            <Typography variant="body1" noWrap>
              {intl.formatMessage({
                defaultMessage: 'Allow long answer (240 characters)',
              })}
            </Typography>
          }
          labelPlacement="end"
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FreeText);
