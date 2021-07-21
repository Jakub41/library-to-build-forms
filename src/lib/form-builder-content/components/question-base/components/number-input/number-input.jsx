import React from 'react';
import NumberInputItem from './number-input-item';

const NumberInput = ({ block, onChange }) => {
  return <NumberInputItem block={block} onChange={onChange} />;
};

export default NumberInput;
