import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import GlossaryItem from '../glossary-item/glossary-item';
import styles from './glossary-list.styles';

const GlossaryList = ({ classes, items, onRemove, onEdit }) => {
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
                <FormattedMessage defaultMessage="No terms in glossary" />
              </Typography>
              <Typography className={classes.secondaryText} variant="body1">
                <FormattedMessage defaultMessage="Add terms by marking text from your form to the left, or clicking 'Add new glossary term' above." />
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(GlossaryList);
