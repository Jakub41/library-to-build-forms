import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import { useQuestionDataChangeManager } from '../../../../hooks';
import { NoteInput } from '../../../single-line-input/single-line-input';
import styles from './audio-content.styles';

const AudioContent = ({ classes, block, onChange }) => {
  const { handleTextOptionChange } = useQuestionDataChangeManager(
    block,
    onChange
  );
  const intl = useIntl();

  const handleRemove = () => {
    const updated = { ...block, items: [] };
    onChange(updated);
  };

  return (
    <>
      <NoteInput
        name="note"
        onChange={handleTextOptionChange}
        value={block?.options?.note}
      />
      <div className={classes.audioContainer}>
        <audio style={{ width: 640 }} controls>
          {block.items &&
            block.items.map((item) => (
              <source key={item.key} src={item.source} type={item.type} />
            ))}
          {intl.formatMessage({
            defaultMessage: 'Your browser does not support this audio.',
          })}
        </audio>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleRemove}
          title="Remove Audio"
        >
          {intl.formatMessage({
            defaultMessage: 'Remove Audio',
          })}
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={block.options?.isOptional}
              onChange={handleTextOptionChange}
              color="primary"
            />
          }
          label={
            <Typography noWrap>
              {intl.formatMessage({
                defaultMessage: 'Listening is optional',
              })}
            </Typography>
          }
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={block.options?.allowScrubbing}
              onChange={handleTextOptionChange}
              color="primary"
            />
          }
          label={
            <Typography noWrap>
              {intl.formatMessage({
                defaultMessage: 'Allow scrubbing / fast forward',
              })}
            </Typography>
          }
          labelPlacement="end"
        />
      </div>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(AudioContent);
