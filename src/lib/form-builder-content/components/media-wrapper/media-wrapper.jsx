import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useQuestionDataChangeManager } from '../../hooks';
import { BlockHeadingInput } from '../single-line-input/single-line-input';
import TextInput from '../text-input/text-input';
import styles from './media-wrapper.styles';
import useDebounce from '../../hooks/useDebounce';

const MediaWrapper = ({ block, onChange, children, classes }) => {
  const { onChangeTitleHandle, handleEditorUpdate } =
    useQuestionDataChangeManager(block, onChange);
  const { value, setValueWithTarget } = useDebounce(block.title, 200, {
    onChangeWithTarget: onChangeTitleHandle,
  });

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.gridItemContainerForHead}>
        <BlockHeadingInput
          label="Add heading"
          name="title"
          onChange={setValueWithTarget}
          value={value}
          isFocused={true}
        />
      </Grid>
      <Grid item className={classes.gridItemContainerForHead}>
        <TextInput
          variant="body2"
          value={block.body}
          onChange={handleEditorUpdate}
        />
      </Grid>
      {children}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(MediaWrapper);
