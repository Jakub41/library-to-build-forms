import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import FormStyler from '../lib/form-builder-styling';
import theme from '../lib/form-builder-preview/theme/theme';
import FontStyleChanger from '../lib/form-builder-styling/components/font-style-changer';
import TextStyleChanger from '../lib/form-builder-styling/components/text-style-changer';
import ColorBubble from '../lib/form-builder-styling/components/color-bubble';
import mockApiStylesheet from '../lib/data/mockApiStylesheet.json';

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/Styler',
};

export default config;

const FormStylerContainer = () => {
  const [updatedTheme, setUpdatedTheme] = React.useState(mockApiStylesheet);
  const handleOnSave = (theme) => {
    console.log(theme);
  };
  return <FormStyler onChange={handleOnSave} theme={updatedTheme} />;
};

export const FullStyler = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <FormStylerContainer {...args} />
  </ThemeProvider>
);
FullStyler.args = { ...theme };

const FontStyleTemplate = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <FontStyleChanger {...args} />
  </ThemeProvider>
);
export const FontStyleExample = FontStyleTemplate.bind({});
FontStyleExample.args = { fontFamily: 'Lato' };

const TextStyleTemplate = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <TextStyleChanger {...args} />
  </ThemeProvider>
);
export const TextStyleExample = TextStyleTemplate.bind({});
TextStyleExample.args = {
  hasUnderline: true,
  hasBold: false,
  hasItalic: true,
  colored: false,
};

const ColorBubbleTemplate = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <ColorBubble {...args} />
  </ThemeProvider>
);
export const ColorBubbleExample = ColorBubbleTemplate.bind({});
ColorBubbleExample.args = { size: 25, color: 'blue' };
