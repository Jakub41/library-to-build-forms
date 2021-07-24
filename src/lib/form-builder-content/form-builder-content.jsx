import { CssBaseline, MuiThemeProvider, withStyles } from '@material-ui/core';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { pdfjs } from 'react-pdf';
import { getMessages } from '../../languages';
import emptyData from '../data/mockData.json';
import roles from '../utils/defaultRoles';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import QuestionnaireHeader from './components/questionnaire-header';
import './fonts.css';
import StateReducerFormBuilderPropTypes from './form-builder-content-types';
import styles from './form-builder-content.styles';
import Section from './section';
import muiTheme from './theme/muiTheme';
import useBuilder, { builderReducer } from './useBuilder';

// Enable pdf loading
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FormBuilderContent = ({ data, dispatch, classes, signatureOptions }) => (
  <div className={classes.container}>
    <QuestionnaireHeader data={data} dispatch={dispatch} />
    {data.sections.map((section, index) => {
      return (
        <Section
          index={index}
          section={section}
          key={index}
          dispatch={dispatch}
          signatureOptions={signatureOptions}
        />
      );
    })}
  </div>
);

const ThemedFormBuilder = withStyles(styles)(FormBuilderContent);

const ThemeContextFormBuilder = async({ data, dispatch, signatureOptions }) => { 
  const [messages] = await getMessages();
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <IntlProvider messages={messages} defaultLocale="en" locale="en">
        <ThemedFormBuilder
          data={data}
          dispatch={dispatch}
          signatureOptions={signatureOptions}
        />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

const StateReducerFormBuilder = ({
  initialData,
  reducer = builderReducer,
  signatureOptions = {
    roles: roles,
  },
}) => {
  const currentData = useGetObjectValueOrDefault(initialData, emptyData);
  const { data, dispatch } = useBuilder(currentData, reducer);
  return (
    <ThemeContextFormBuilder
      data={data}
      dispatch={dispatch}
      signatureOptions={signatureOptions}
    />
  );
};

StateReducerFormBuilder.propTypes = StateReducerFormBuilderPropTypes;

export default StateReducerFormBuilder;
