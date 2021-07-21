import { withStyles } from '@material-ui/core';
import React from 'react';
import styles from './Audio.styles';

const Audio = ({ block, onChange }) => {
  const handleEnded = () => onChange({ ...block, answer: true });

  // TODO: Disable scrubbing on option.allowScrubbing
  return (
    <audio style={{ width: 640 }} controls onEnded={handleEnded}>
      {block.items && block.items.map((item) => <source key={item.key} src={item.source} type={item.type} />)}
      Your browser does not support this audio.
    </audio>
  );
};

export default withStyles(styles, { withTheme: true })(Audio);
