import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import React from 'react';
import { textLengthCap } from '../../../../constants';
import styles from './FreeText.styles';

const FreeText = ({ block, onChange, readOnly, classes }) => {
  const handleChange = (e) => {
    const blockCopy = { ...block };
    blockCopy.answer = e.target.value;
    onChange(blockCopy);
  };

  if (block.options.isMultiLine) {
    return (
      <form>
        <TextField
          color="secondary"
          fullWidth={true}
          value={block.answer}
          variant="filled"
          onChange={handleChange}
          multiline={!!block.options.isMultiLine}
          rows={3}
          InputProps={{ classes: { root: classes.multiLineInput } }}
          placeholder={block.options.placeholder}
          inputProps={{ maxLength: textLengthCap.multiLines }}
        />
      </form>
    );
  } else {
    return (
      <form>
        <TextField
          color="secondary"
          fullWidth={true}
          value={block.answer}
          variant="filled"
          onChange={handleChange}
          InputProps={{
            classes: {
              root: classes.backgroundRoot,
              input: classes.singleLineInput,
            },
          }}
          placeholder={block.options.placeholder}
          inputProps={{ maxLength: textLengthCap.singleLine }}
          disabled={readOnly}
        />
      </form>
    );
  }
};

export default withStyles(styles, { withTheme: true })(FreeText);
