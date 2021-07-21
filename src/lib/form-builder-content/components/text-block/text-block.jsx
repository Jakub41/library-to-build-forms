import { withStyles } from '@material-ui/styles';
import React from 'react';
import { Grid } from '@material-ui/core';
import BlockWrapper from '../../section/section-block/block-wrapper';
import BlockMenu from '../block-menu';
import FormatMenu from './format-menu';
import InputWrapper from '../input-wrapper/input-wrapper';
import styles from './text-block.styles';


const TextBlock = ({ block, onChange, onDuplicate, onDelete, draggableIndicator }) => {

  const handleFormatChange = () => {
    const blockCopy = { ...block };
    blockCopy.options.isHighlighted = !blockCopy.options.isHighlighted;
    onChange(blockCopy);
  }

  return (
    <BlockWrapper
      title="Text Block"
      draggableIndicator={draggableIndicator}
      rightHeader={
        <>
          <Grid item>
            <FormatMenu block={block} onChange={handleFormatChange} />
          </Grid>
          <BlockMenu onDelete={() => onDelete(block)} onDuplicate={() => onDuplicate(block)} />
        </>
      }
    >
      <InputWrapper block={block} onChange={onChange} />
    </BlockWrapper>
  );
};

export default withStyles(styles)(TextBlock);
