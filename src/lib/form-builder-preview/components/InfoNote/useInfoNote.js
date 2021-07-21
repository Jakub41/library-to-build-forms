import { useState, useCallback, useEffect } from 'react';

const useInfoNote = (anchorElementId, shouldDisplayNote, adminMode) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (shouldDisplayNote && !adminMode) {
      const el = document.getElementById(anchorElementId);
      setAnchorEl(el);
      const isHelpNoteDisplayed = localStorage.getItem('help-note-displayed');
      setIsNoteOpen(!isHelpNoteDisplayed);
    }
  }, [shouldDisplayNote]);

  const handleNoteClose = useCallback(() => {
    localStorage.setItem('help-note-displayed', 'Yes');
    setIsNoteOpen(false);
  }, []);

  return { isNoteOpen, anchorEl, handleNoteClose };
};

export default useInfoNote;
