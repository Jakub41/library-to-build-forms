import { withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { blockTypes } from '../../../constants';
import { useQuestionDataChangeManager } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import { BlockHeadingInput } from '../single-line-input/single-line-input';
import TextInput from '../text-input/text-input';
import Visible from '../visible';
import styles from './input-wrapper.styles';

const excludedFooterForTypes = [blockTypes.textBlock, blockTypes.signature];

const InputWrapper = ({ block, onChange, children, classes }) => {
  const {
    onChangeTitleHandle,
    handleEditorUpdate,
    onCheckOptional,
  } = useQuestionDataChangeManager(block, onChange);
  const { value, setValueWithTarget } = useDebounce(block.title, 200, {
    onChangeWithTarget: onChangeTitleHandle,
  });
  const isOptional = useMemo(() => block?.options?.optional ?? false, [block]);
  const intl = useIntl();

  return (
    <Grid>
      <Grid container direction="column" alignItems="flex-start">
        <Grid item className={classes.gridItemContainerForHead}>
          <BlockHeadingInput
            label="Add subheading (optional)"
            name="title"
            onChange={setValueWithTarget}
            value={value}
            isFocused={false}
          />
        </Grid>
        <Grid item className={classes.gridItemContainerForHead}>
          <TextInput
            variant="body2"
            value={block.body}
            onChange={handleEditorUpdate}
          />
        </Grid>
        <Visible when={children}>
          <Divider className={classes.divider} flexItem variant="middle" />
          {children}
          <Divider className={classes.divider} flexItem variant="middle" />
        </Visible>
        <Grid
          container
          justify="flex-end"
          className={classes.gridItemContainerForFooter}
        >
          <Visible
            children={
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    checked={isOptional}
                    onChange={onCheckOptional}
                    color="primary"
                    name="optional"
                  />
                }
                label={
                  <Typography variant="body2" noWrap>
                    {intl.formatMessage({
                      defaultMessage: 'Optional question',
                    })}
                  </Typography>
                }
                labelPlacement="start"
              />
            }
            when={!excludedFooterForTypes.includes(block.type)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(InputWrapper);
