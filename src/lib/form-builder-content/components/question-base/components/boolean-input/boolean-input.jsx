import React from 'react';

import BooleanInputItem from './boolean-input-item';

const BooleanInput = ({ block, onChange }) => {
  return <BooleanInputItem block={block} onChange={onChange} />;
};

export default BooleanInput;
