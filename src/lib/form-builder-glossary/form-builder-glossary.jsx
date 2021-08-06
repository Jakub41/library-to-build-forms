import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { getMessages } from '../../languages';
// import enMessages from '../../compiled-lang/en.json';
import emptyForm from '../data/mockData.json';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import { cleanCopy, mapApiFormatToLocal } from '../utils/utils';
import ContextMenu from './components/context-menu/context-menu';
import GlossaryList from './components/glossary-list/glossary-list';
import './fonts.css';
import FormBuilderGlossaryTypes from './form-builder-glossary-types';
import styles from './form-builder-glossary.styles';
import useHighlight from './hooks/useHighlight';
import theme from './theme/theme';

const FormBuilderGlossary = ({
  classes,
  initialData,
  glossary = [],
  onChange = () => {},
}) => {
  const currentForm = useGetObjectValueOrDefault(initialData, emptyForm);
  const form = useMemo(() => {
    let result = cleanCopy(currentForm);
    return mapApiFormatToLocal(result);
  }, [currentForm]);

  const {
    highLightQuery,
    onHandleRemoveGlossary,
    onAddNewGlossaryTerm,
    onHandleGlossaryChange,
    text,
    items,
  } = useHighlight(form, glossary, onChange);

  const onHandleContextMenuClick = useCallback(
    (value) => {
      highLightQuery(value);
    },
    [highLightQuery]
  );

  const handleRemoveGlossary = useCallback(
    (term) => {
      onHandleRemoveGlossary(term);
    },
    [onHandleRemoveGlossary]
  );

  const handleOnChangeGlossary = useCallback(
    (prevTerm, { term, explanation }) => {
      onHandleGlossaryChange(prevTerm, { term, explanation });
    },
    [onHandleGlossaryChange]
  );

  const handleAddNewGlossary = useCallback(() => {
    onAddNewGlossaryTerm();
  }, [onAddNewGlossaryTerm]);

  const bootstrapApplication = async() => {
    const [messages] = await Promise.all([getMessages()]);
    console.log('NOTHING', messages);
    ThemeContextFormBuilderGlossary(messages);
  }
  
  bootstrapApplication();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Box width={{ xs: '100%', md: '80%' }} className={classes.container}>
          <Grid
            container
            className={classes.root}
            spacing={0}
            style={{ alignSelf: 'center' }}
          >
            <Grid
              item
              style={{ width: '552px' }}
              className={classes.gridItemContainer}
            >
              <ContextMenu handleContextMenuClick={onHandleContextMenuClick}>
                <div id="glossary-text">
                  <Typography className={classes.textArea}>{text}</Typography>
                </div>
              </ContextMenu>
            </Grid>
            <Divider
              variant="middle"
              orientation="vertical"
              className={classes.divider}
              flexItem
            />
            <Grid
              item
              style={{ width: '552px' }}
              className={classes.gridItemContainer}
            >
              <Grid
                direction="column"
                container
                justify="center"
                alignContent="center"
                alignItems="center"
              >
                <Grid item className={classes.header}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddNewGlossary}
                  >
                    new glossary term
                  </Button>
                </Grid>
                <GlossaryList
                  onRemove={handleRemoveGlossary}
                  onEdit={handleOnChangeGlossary}
                  items={items}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

FormBuilderGlossary.propTypes = FormBuilderGlossaryTypes;

const ThemeContextFormBuilderGlossary = (props, messages) => {
  console.log('HEYOOOO', props.default);
  const StyledFormBuilder = withStyles(styles)(FormBuilderGlossary);

  return (
    <IntlProvider messages={props.default} defaultLocale="en" locale="it">
      <ThemeProvider theme={theme}>
        <StyledFormBuilder {...props} />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default ThemeContextFormBuilderGlossary;
