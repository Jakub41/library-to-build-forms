import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

function HoverTooltip ({ children, text }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState(text);

  const handleOnTooltipClose = () => {
    setTooltipText(text);
    setShowTooltip(false);
  };

  const handleOnHover = e => {
    if (text) {
      setShowTooltip(true);
    }
  };

  
  return (
    <Tooltip
      open={showTooltip}
      leaveDelay={250}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnTooltipClose}
      onClose={handleOnTooltipClose}
      title={tooltipText}
      placement="top"
    >
      {children}
    </Tooltip>
  );
};

export default HoverTooltip;
