import React from 'react';
import { MuiWrapper, ThemeProvider } from './context';
import './fonts.css';
import FormBuilderStyling from './form-builder-styling';

import { mapICFStyleSheetToLocalStyle, mapLocalStyleFormatToICFStyleSheet } from '../utils/utils';
import apiStyleSheet from '../data/mockApiStylesheet.json';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import FormStylerPropTypes from "./form-styler-types";

const FormStyler = ({ onChange, theme }) => {
  const serverTheme = useGetObjectValueOrDefault(theme, apiStyleSheet);
  const remappedTheme = mapICFStyleSheetToLocalStyle(serverTheme);
  const handleOnSave = (updatedTheme) => {
    const remapToICFStyle = mapLocalStyleFormatToICFStyleSheet(updatedTheme);
    onChange(remapToICFStyle);
  };
  return (
    <ThemeProvider onSave={handleOnSave} userTheme={remappedTheme}>
      <MuiWrapper>
        <FormBuilderStyling />
      </MuiWrapper>
    </ThemeProvider>
  );
};



FormStyler.propTypes = FormStylerPropTypes;

export default FormStyler;
