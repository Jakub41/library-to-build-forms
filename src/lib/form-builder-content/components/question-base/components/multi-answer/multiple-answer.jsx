import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Clear as ClearIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { useQuestionDataChangeManager, useQuestionItemsChangeManager } from '../../../../hooks';
import Answer from './answer';
import styles from './multiple-answer-wrapper.styles';

const MultipleAnswerWrapper = ({ classes, block, onChange, preview, allowFreeText }) => {
  const [isFocused, setIsFocused] = useState(null);
  const { handleCheckboxOptionChange } = useQuestionDataChangeManager(block, onChange);
  const { handleOnAddNew, handleOnRemove, handleOnItemChange } = useQuestionItemsChangeManager(block, onChange, {
    key: '',
    value: '',
    isMandatory: false,
  });

  const handleFocus = (index) => {
    if (!block.options?.allowFreeText) {
      if (block.items.length === index) {
        handleOnAddNew();
      }

      setIsFocused(index);
    }
  };
  const handleBlur = (index) => {
    if (index === isFocused) {
      setIsFocused(null);
    }
  };

  return (
    <>
      {block.items.map((item, index) => {
        const isIconDisabled = block.items.length === 1 && index === 0;
        return (
          <Grid key={index} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={11}>
              <Answer
                item={item}
                index={index}
                onItemChange={handleOnItemChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                preview={preview}
                onOptionChange={handleCheckboxOptionChange}
                allowFreeText={block.options?.allowFreeText}
                isOptional={block.options?.optional}
                isFocused={isFocused}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton disabled={isIconDisabled} aria-label="clear" className={classes.button} onClick={() => handleOnRemove(index)}>
                <ClearIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Grid
        key={block.items.length}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ opacity: block.options?.allowFreeText ? 1 : 0.3 }}
      >
        <Grid item xs={11}>
          <Answer
            item={{}}
            index={block.items.length}
            onItemChange={({ isMandatory }) => handleCheckboxOptionChange({ target: { name: 'isFreeTextMandatory', checked: isMandatory } })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            preview={preview}
            displayFreeText={true && allowFreeText}
            onOptionChange={handleCheckboxOptionChange}
            allowFreeText={block.options?.allowFreeText}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled aria-label="clear" className={classes.button}>
            <ClearIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(MultipleAnswerWrapper);
