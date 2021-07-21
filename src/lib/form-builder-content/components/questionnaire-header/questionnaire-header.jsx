import {
  FormControlLabel,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';
import useDebounce from '../../hooks/useDebounce';
import InsertBlockDialog from '../../section/insert-block-dialog/insert-block-dialog';
import modes from '../../section/insert-block-dialog/insert-block-dialog.static';
import { actionCreators } from '../../useBuilder';
import { QuestionnaireHeadingInput } from '../single-line-input/single-line-input';
import TextInput from '../text-input/text-input';
import styles from './questionnaire-header.styles';

const QuestionnaireHeader = ({ data, dispatch, classes }) => {
  const intl = useIntl();
  const onChangeTitleHandle = ({ target }) => {
    dispatch(actionCreators.updateFormTitle(target.value));
  };
  const handleEditorUpdate = (value) =>
    dispatch(actionCreators.updateFormBody(value));

  const handleInsertSection = () => dispatch(actionCreators.addSectionOnTop());

  const handleOnChangeOptions = ({ target }) =>
    dispatch(
      actionCreators.updateFormOption({
        [target.name]: !data.options[target.name],
      })
    );

  const { value, setValueWithTarget } = useDebounce(data.title, 200, {
    onChangeWithTarget: onChangeTitleHandle,
  });

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Paper className={classes.root}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
            >
              <Grid item>
                <Typography variant="overline">
                  {intl.formatMessage({
                    defaultMessage: 'Consent form title page',
                  })}
                </Typography>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.options?.excludeTableOfContents}
                      onChange={handleOnChangeOptions}
                      name="excludeTableOfContents"
                      color="primary"
                    />
                  }
                  label={
                    <Typography noWrap>
                      {intl.formatMessage({
                        defaultMessage: 'Exclude table of contents',
                      })}
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
            <Grid item className={classes.gridItemContainer}>
              <QuestionnaireHeadingInput
                label={intl.formatMessage({
                  defaultMessage: 'Add heading',
                })}
                name="title"
                onChange={setValueWithTarget}
                value={value}
                isFocused={true}
              />
            </Grid>
            <Grid item className={classes.gridItemContainer}>
              <TextInput value={data.body} onChange={handleEditorUpdate} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center">
          <Grid item>
            <InsertBlockDialog
              onInsertBlock={handleInsertSection}
              mode={modes.top}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(QuestionnaireHeader);
