import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import { useQuestionDataChangeManager } from '../../../../hooks';
import { NoteInput } from '../../../single-line-input/single-line-input';
import styles from './video-content.styles';

const VideoContent = ({ classes, block, onChange }) => {
  const intl = useIntl();
  const {
    handleTextOptionChange,
    handleCheckboxOptionChange,
  } = useQuestionDataChangeManager(block, onChange);

  const handleRemoveVideo = () => {
    const updated = { ...block, items: [] };
    onChange(updated);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <NoteInput
            name="note"
            onChange={handleTextOptionChange}
            value={block?.options?.note}
          />
        </Grid>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <div className={classes.videoContainer}>
              <video width="640" height="480" controls>
                {block.items &&
                  block.items.map((item) => (
                    <source key={item.key} src={item.source} type={item.type} />
                  ))}
                {intl.formatMessage({
                  defaultMessage: 'Your browser does not support video.',
                })}
              </video>
            </div>
            <Button
              className={classes.button}
              color="primary"
              onClick={handleRemoveVideo}
              title="Remove Video"
            >
              {intl.formatMessage({
                defaultMessage: 'Remove Video',
              })}
            </Button>
          </Grid>
          <Grid item>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={block.options?.isOptional}
                    onChange={handleCheckboxOptionChange}
                    name="isOptional"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1" noWrap>
                    {intl.formatMessage({
                      defaultMessage: 'Watching is optional',
                    })}
                  </Typography>
                }
                labelPlacement="end"
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={block.options?.allowScrubbing}
                  onChange={handleCheckboxOptionChange}
                  name="allowScrubbing"
                  color="primary"
                />
              }
              label={
                <Typography body="body1" noWrap>
                  {intl.formatMessage({
                    defaultMessage: 'Allow scrubbing / fast forward',
                  })}
                </Typography>
              }
              labelPlacement="end"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(VideoContent);
