import { useState, useEffect } from 'react';

export default function useDebounce(inputValue, delay, { onChange, onChangeWithTarget }) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [value, setValue] = useState(inputValue);
  const [targetName, setTargetName] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if ((debouncedValue || debouncedValue === '') && debouncedValue !== inputValue) {
        onChange && onChange(debouncedValue);
        onChangeWithTarget && onChangeWithTarget({ target: { name: targetName, value: debouncedValue } });
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, delay, inputValue, targetName]);

  useEffect(() => setValue(inputValue), [inputValue]);

  const setUpdatedValue = (value) => {
    setDebouncedValue(value);
    setValue(value);
  };

  const setValueWithTarget = ({ target }) => {
    setTargetName(target.name);
    setDebouncedValue(target.value);
    setValue(target.value);
  };

  return { value, setValue: setUpdatedValue, setValueWithTarget };
}
