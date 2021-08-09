import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../compiled-lang/en.json';
import apiStyleSheet from '../data/mockApiStylesheet.json';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import {
  mapICFStyleSheetToLocalStyle,
  mapLocalStyleFormatToICFStyleSheet,
} from '../utils/utils';
import { MuiWrapper, ThemeProvider } from './context';
import './fonts.css';
import FormBuilderStyling from './form-builder-styling';
import FormStylerPropTypes from './form-styler-types';

const FormStyler = ({ onChange, theme }) => {
  const serverTheme = useGetObjectValueOrDefault(theme, apiStyleSheet);
  const remappedTheme = mapICFStyleSheetToLocalStyle(serverTheme);
  const handleOnSave = (updatedTheme) => {
    const remapToICFStyle = mapLocalStyleFormatToICFStyleSheet(updatedTheme);
    onChange(remapToICFStyle);
  };
  return (
    <ThemeProvider onSave={handleOnSave} userTheme={remappedTheme}>
      <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
        <MuiWrapper>
          <FormBuilderStyling />
        </MuiWrapper>
      </IntlProvider>
    </ThemeProvider>
  );
};

FormStyler.propTypes = FormStylerPropTypes;

export default FormStyler;
