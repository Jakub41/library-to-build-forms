import React, { useState } from 'react';

function useEditMode(initialState) {
  const [isInEditMode, setIsInEditMode] = useState(initialState);
  const toggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  return { isInEditMode, toggleEditMode };
}

export default useEditMode;
