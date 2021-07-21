import { useCallback, useEffect, useState } from 'react';
import { modes } from '../constants/constants';

const useHelpWizard = () => {
  const [mode, setMode] = useState(modes.NONE);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selection, setSelection] = useState('');

  const subscribeQuoteChosen = useCallback((subscription) => setSubscriptions([subscription]), [setSubscriptions]);

  const handleSelection = useCallback(() => {
    const selectionString = document.getSelection().toString();
    if (selectionString && !isTextSelected) {
      setIsTextSelected(true);
    }
    if (!selectionString && isTextSelected) {
      setIsTextSelected(false);
    }
    setSelection(selectionString);
  }, [isTextSelected, setIsTextSelected]);

  const handleSelectionComplete = useCallback(() => {
    setMode(modes.MESSENGER);
    subscriptions.forEach((subscription) => subscription(selection));
  }, [selection]);

  const handleSkipSelection = useCallback(() => {
    setMode(modes.MESSENGER);
  }, []);

  const handleSelectQuote = useCallback(() => {
    setMode(modes.SELECTION);
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [handleSelection]);

  return {
    isTextSelected,
    mode,
    setMode,
    handleSelectionComplete,
    handleSkipSelection,
    handleSelectQuote,
    subscribeQuoteChosen,
  };
};

export default useHelpWizard;
