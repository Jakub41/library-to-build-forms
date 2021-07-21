import { Input, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import styles from './dropzone.styles';

const DropZone = ({ classes, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        {...getRootProps()}
        className={classes.gridContainer}
      >
        <Grid item>
          <AddIcon className={classes.icon} />
        </Grid>
        {isDragActive ? (
          <Typography variant="body1">
            {intl.formatMessage({ defaultMessage: 'Drop the files here ...' })}
          </Typography>
        ) : (
          <>
            <Grid item>
              <Typography variant="body1">
                {intl.formatMessage({
                  defaultMessage: 'Drag & drop your file here',
                })}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="body1">
                {intl.formatMessage({ defaultMessage: 'or' })}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item>
          <Button className={classes.button} variant="outlined" color="primary">
            {intl.formatMessage({ defaultMessage: 'Browse files' })}
          </Button>
        </Grid>
        <Input inputProps={{ ...getInputProps(), multiple: false }} />
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(DropZone);
