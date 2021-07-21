const colorPalette = ['#0C91E9', '#005B86', '#5D1CB3', '#C21876', '#DA431F', '#DD8E25', '#87B323', '#328917'];

const variantsEnum = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  SUBHEADING: 'subheading',
  HEADING: 'heading',
  SUBTITLE1: 'subtitle1',
  SUBTITLE2: 'subtitle2',
  BODY: 'body',
  BODY1: 'body1',
  BODY2: 'body2',
  BUTTON: 'button',
  CAPTION: 'caption',
  OVERLINE: 'overline',
};
const variants = {
  heading: ['h4', 'h5'],
  subheading: ['h6', 'subtitle1'],
  body: ['body1', 'caption'],
  button: ['button'],
  caption: ['caption'],
  overline: ['overline'],
}

const defaultFontFamilyList = ['Arial', 'Lato', 'Times New Roman', 'Calibri', 'Roboto', 'Open Sans', 'Segoe UI', 'Poppins'].sort();

const fontWeightList = ['Light', 'Regular', 'Medium', 'Semi-bold', 'Bold'].reduce((acc, current, index) => ({ ...acc, [(index + 3) * 100]: current }), {});

export { colorPalette, variantsEnum, variants, defaultFontFamilyList, fontWeightList };
