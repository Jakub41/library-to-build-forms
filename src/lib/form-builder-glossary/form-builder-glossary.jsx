import './fonts.css';
import React, { useCallback, useMemo } from 'react';
import { Box, CssBaseline, Grid, MuiThemeProvider, Typography, withStyles } from '@material-ui/core';
import emptyForm from '../data/mockData.json';
import styles from './form-builder-glossary.styles';
import muiTheme from './theme/muiTheme';
import Divider from '@material-ui/core/Divider';
import ContextMenu from './components/context-menu/context-menu';
import useHighlight from './hooks/useHighlight';
import GlossaryList from './components/glossary-list/glossary-list';
import Button from '@material-ui/core/Button';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import { mapApiFormatToLocal, cleanCopy } from '../utils/utils';
import FormBuilderGlossaryTypes from "./form-builder-glossary-types";

const FormBuilderGlossary = ({ classes, initialData, glossary = [], onChange = () => {} }) => {
  const currentForm = useGetObjectValueOrDefault(initialData, emptyForm);
  const form = useMemo(() => {
    let result = cleanCopy(currentForm);
    return mapApiFormatToLocal(result);
  }, [currentForm]);

  const { highLightQuery, onHandleRemoveGlossary, onAddNewGlossaryTerm, onHandleGlossaryChange, text, items } = useHighlight(form, glossary, onChange);

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

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Box width={{ xs: '100%', md: '80%' }} className={classes.container}>
          <Grid container className={classes.root} spacing={0} style={{ alignSelf: 'center' }}>
            <Grid item style={{ width: '552px' }} className={classes.gridItemContainer}>
              <ContextMenu handleContextMenuClick={onHandleContextMenuClick}>
                <div id="glossary-text">
                  <Typography className={classes.textArea}>{text}</Typography>
                </div>
              </ContextMenu>
            </Grid>
            <Divider variant="middle" orientation="vertical" className={classes.divider} flexItem />
            <Grid item style={{ width: '552px' }} className={classes.gridItemContainer}>
              <Grid direction="column" container justify="center" alignContent="center" alignItems="center">
                <Grid item className={classes.header}>
                  <Button variant="outlined" color="primary" onClick={handleAddNewGlossary}>
                    new glossary term
                  </Button>
                </Grid>
                <GlossaryList onRemove={handleRemoveGlossary} onEdit={handleOnChangeGlossary} items={items} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </MuiThemeProvider>
  );
};

FormBuilderGlossary.propTypes = FormBuilderGlossaryTypes;

export default withStyles(styles)(FormBuilderGlossary);
