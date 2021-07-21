import { useMemo } from 'react';

const useGetObjectValueOrDefault = (value, defaultValue) => {
  return useMemo(() => {
    let result = value;
    if (!result || (Object.keys(result).length === 0 && result.constructor === Object)) {
      result = defaultValue;
    }
    return result;
  }, [value, defaultValue]);
};

export default useGetObjectValueOrDefault;
