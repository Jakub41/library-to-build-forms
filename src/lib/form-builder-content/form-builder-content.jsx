import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { pdfjs } from 'react-pdf';
import { getMessages } from '../../languages';
//import enMessages from '../../compiled-lang/en.json';
import emptyData from '../data/mockData.json';
import roles from '../utils/defaultRoles';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import QuestionnaireHeader from './components/questionnaire-header';
import './fonts.css';
import StateReducerFormBuilderPropTypes from './form-builder-content-types';
import styles from './form-builder-content.styles';
import Section from './section';
import theme from './theme/theme';
import useBuilder, { builderReducer } from './useBuilder';

async function bootstrapApplication() {
  const [messages] = await Promise.all([getMessages()]);

  ThemeContextFormBuilder({ ...messages });
}

bootstrapApplication();

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

const ThemeContextFormBuilder = ({
  data,
  dispatch,
  signatureOptions,
  messages,
}) => {
  return (
    <IntlProvider messages={messages} defaultLocale="en" locale="it">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemedFormBuilder
          data={data}
          dispatch={dispatch}
          signatureOptions={signatureOptions}
        />
      </ThemeProvider>
    </IntlProvider>
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
