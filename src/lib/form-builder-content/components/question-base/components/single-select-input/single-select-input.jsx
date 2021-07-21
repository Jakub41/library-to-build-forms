import { Radio } from '@material-ui/core';
import React from 'react';
import MultipleAnswer from '../multi-answer';

const SingleSelectInput = ({ block, onChange }) => {
  return <MultipleAnswer block={block} onChange={onChange} preview={<Radio size="small" disabled color="primary" disableRipple />} allowFreeText />;
};

export default SingleSelectInput;
