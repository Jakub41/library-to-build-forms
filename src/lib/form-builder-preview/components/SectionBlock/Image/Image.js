import { withStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import styles from './Image.styles';

const Image = ({ block, onChange, classes }) => {
  useEffect(() => {
    // Mark seen when loaded
    onChange({ ...block, answer: true });
  }, []);

  return (
    <img
      src={block.items[0]?.source}
      className={classes.image}
      controls
      alt="uploaded"
    />
  );
};

export default withStyles(styles, { withTheme: true })(Image);
