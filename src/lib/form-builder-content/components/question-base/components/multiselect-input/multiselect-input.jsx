import React from 'react';
import { CheckBox } from '@material-ui/icons';
import MultipleAnswer from '../multi-answer';

const MultiSelectInput = ({ block, onChange }) => {
  return <MultipleAnswer block={block} onChange={onChange} preview={<CheckBox name="isSelected" color="primary" disabled />} allowFreeText />;
};

export default MultiSelectInput;
