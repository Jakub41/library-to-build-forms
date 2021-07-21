import React from 'react';
import MultipleAnswer from '../multi-answer';

const DropdownInput = ({ block, onChange }) => {
  return <MultipleAnswer block={block} onChange={onChange} preview={null} />;
};

export default DropdownInput;
