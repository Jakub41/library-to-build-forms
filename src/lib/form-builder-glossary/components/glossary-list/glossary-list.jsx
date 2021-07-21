import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import GlossaryItem from '../glossary-item/glossary-item';
import styles from './glossary-list.styles';

const NO_GLOSSARY_TERMS = `Add terms by marking text from your form to the left,\n or clicking "Add new glossary term" above.`;

const GlossaryList = ({ classes, items, onRemove, onEdit }) => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Grid
        direction="column"
        container
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        {items.length > 0 ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="baseline"
            justify="flex-start"
            className={classes.gridContainer}
          >
            {items.map((item, index) => (
              <GlossaryItem
                key={index}
                index={index}
                item={item}
                onRemove={onRemove}
                onEdit={onEdit}
              />
            ))}
          </Grid>
        ) : (
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.gridContainer}
          >
            <Grid item>
              <Typography className={classes.secondaryText} variant="h4">
                {intl.formatMessage({ defaultMessage: 'No terms in glossary' })}
              </Typography>
              <Typography className={classes.secondaryText} variant="body1">
                {intl.formatMessage({ defaultMessage: NO_GLOSSARY_TERMS })}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(GlossaryList);
