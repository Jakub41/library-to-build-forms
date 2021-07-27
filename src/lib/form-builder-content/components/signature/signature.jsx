import { FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuestionDataChangeManager } from '../../hooks';
import BlockWrapper from '../../section/section-block/block-wrapper';
import BlockMenu from '../block-menu';
import InputWrapper from '../input-wrapper/input-wrapper';
import { MultilineInput } from '../multi-line-input/multi-line-input';
import { NoteInput } from '../single-line-input/single-line-input';
import styles from './signature.styles';

const Signature = ({
  classes,
  block,
  onChange,
  onDelete,
  onDuplicate,
  draggableIndicator,
  roles,
}) => {
  const intl = useIntl();
  const [isCounterSignee, setIsCounterSignee] = useState(false);

  const { handleTextOptionChange, handleRecipientChange } =
    useQuestionDataChangeManager(block, onChange);

  const handleSelectChange = (e) => {
    setIsCounterSignee(e.target?.value === 'COUNTERSIGNEE');
    handleRecipientChange(e);
  };

  return (
    <BlockWrapper
      title="Signature"
      rightHeader={
        <BlockMenu
          onDelete={() => onDelete(block)}
          onDuplicate={() => onDuplicate(block)}
        />
      }
      draggableIndicator={draggableIndicator}
    >
      <InputWrapper block={block} onChange={onChange} />
      <Grid container direction="column">
        <Grid item>
          <MultilineInput
            name="disclaimer"
            onChange={handleTextOptionChange}
            value={block?.options?.disclaimer}
            placeholder="Disclaimer"
            rows={2}
            disabled={isCounterSignee}
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.roleSelect}>
            <Select
              value={block?.recipient?.role || ''}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select signee role
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <NoteInput
            error={!(block?.meta?.valid ?? true)}
            name="reason"
            label={intl.formatMessage({ defaultMessage: 'Signing reason' })}
            value={block?.options?.reason || ''}
            onChange={handleTextOptionChange}
            onBlur={handleTextOptionChange}
          />
        </Grid>
      </Grid>
    </BlockWrapper>
  );
};

export default withStyles(styles, { withTheme: true })(Signature);
