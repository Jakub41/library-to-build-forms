import { useRef, useEffect } from 'react';

const useAutoFocus = () => {
  var formRef = useRef(null);

  useEffect(() => {
    formRef.current?.focus();
  }, []);

  return { formRef };
};

export default useAutoFocus;
