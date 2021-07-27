import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './image-content.styles';

const ImageContent = ({ classes, block, onChange }) => {
  const handleRemoveVideo = () => {
    const updated = { ...block, items: [] };
    onChange(updated);
  };

  return (
    <div className={classes.imageContainer}>
      <Grid container direction="column">
        <Grid item>
          <img
            src={block.items[0]?.source}
            className={classes.image}
            controls
            alt="uploaded"
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleRemoveVideo}
            title="Remove Video"
            text={<FormattedMessage defaultMessage="Remove Photo" />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ImageContent);
