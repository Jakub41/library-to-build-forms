import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import Visible from '../../Visible';
import styles from './Video.styles';

const Video = ({ block, onChange, classes }) => {
  const handleVideoEnd = () => onChange({ ...block, answer: true });

  // TODO: Disable scrubbing on option.allowScrubbing
  return (
    <>
      <video style={{ width: '100%' }} controls onEnded={handleVideoEnd}>
        {block.items &&
          block.items.map((item, i) => (
            <source key={i} src={item.source} type={item.type} />
          ))}
        Your browser does not support video.
      </video>
      <Visible when={block.options?.note}>
        <Typography className={classes.caption} variant="caption">
          {block.options.note}
        </Typography>
      </Visible>
    </>
  );
};

export default withStyles(styles)(Video);
