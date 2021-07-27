import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import useDebounce from '../../../../hooks/useDebounce';
import { slugify } from '../../../../utils/slugify';
import { ItemInput } from '../../../single-line-input/single-line-input';
import Visible from '../../../visible';
import HoverTooltip from '../hover-tooltip/hover-tooltip';
import styles from './answer.styles';

const Answer = ({
  classes,
  item,
  index,
  onItemChange,
  onFocus,
  onBlur,
  preview,
  displayFreeText,
  allowFreeText,
  onOptionChange,
  isOptional,
  isFocused,
}) => {
  const intl = useIntl();
  const onValueChangeHandle = (value) => {
    const updated = { ...item, value, key: slugify(value) };
    onItemChange(updated, index);
  };

  const onCheckboxChangeHandle = ({ target }) => {
    const updated = { ...item, [target.name]: target.checked };
    onItemChange(updated, index);
  };

  const { value, setValue } = useDebounce(item.value, 100, {
    onChange: onValueChangeHandle,
  });

  const handleValueChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      justify="flex-start"
      spacing={2}
    >
      <Visible when={preview}>
        <Grid item className={classes.answerPreview}>
          {preview}
        </Grid>
      </Visible>
      <Grid item className={classes.answerInfoContainer}>
        <ItemInput
          name="value"
          label={intl.formatMessage({
            defaultMessage: 'Add answer text',
          })}
          value={value}
          onChange={handleValueChange}
          onFocus={() => onFocus(index)}
          onBlur={() => onBlur(index)}
          disabled={displayFreeText && allowFreeText}
          isFocused={isFocused === index}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          className={classes.answerEndorsement}
          control={
            <Checkbox
              disabled={isOptional}
              onChange={onCheckboxChangeHandle}
              name="isMandatory"
              color="primary"
              checked={item.isMandatory}
            />
          }
          label={
            <Box
              display="flex"
              flexDirection="row"
              justifyContents="center"
              alignItems="center"
            >
              <Typography noWrap>
                {intl.formatMessage({
                  defaultMessage: 'Accepted answer',
                })}
              </Typography>
              <HoverTooltip
                text={intl.formatMessage({
                  defaultMessage:
                    'Marking one (or several) answers as accepted prevents the user from proceeding unless they select one of the accepted answers.',
                })}
              >
                <InfoIcon className={classes.infoIcon} />
              </HoverTooltip>
            </Box>
          }
          labelPlacement="end"
        />
      </Grid>
      <Visible when={displayFreeText}>
        <Grid item>
          <FormControlLabel
            className={classes.answerEndorsement}
            control={
              <Checkbox
                onChange={onOptionChange}
                name="allowFreeText"
                color="primary"
                checked={allowFreeText}
              />
            }
            label={
              <Typography noWrap>
                {intl.formatMessage({
                  defaultMessage: 'Free text answer',
                })}
              </Typography>
            }
            labelPlacement="end"
          />
        </Grid>
      </Visible>
    </Grid>
  );
};

export default withStyles(styles)(Answer);
