export const blockTypes = {
  // Meta Types
  question: 'question',
  media: 'media',
  // Actual Types
  textBlock: 'textblock',
  freetext: 'text',
  multiselect: 'multiselect',
  yesno: 'yesno',
  singleselect: 'singleselect',
  number: 'number',
  dropdown: 'dropdown',
  scale: 'scale',
  signature: 'signature',
  video: 'video',
  pdf: 'pdf',
  image: 'image',
  audio: 'audio',
};

export const blockTypeNames = {
  // Meta Types
  [blockTypes.question]: 'Question',
  [blockTypes.media]: 'Media',
  // Actual Types
  [blockTypes.textBlock]: 'Text block',
  [blockTypes.freetext]: 'Free text',
  [blockTypes.multiselect]: 'Multi select',
  [blockTypes.yesno]: 'Yes/No',
  [blockTypes.singleselect]: 'Single select',
  [blockTypes.number]: 'Number',
  [blockTypes.dropdown]: 'Dropdown',
  [blockTypes.scale]: 'Scale',
  [blockTypes.signature]: 'Signature',
  [blockTypes.video]: 'Video',
  [blockTypes.pdf]: 'PDF',
  [blockTypes.image]: 'Image',
  [blockTypes.audio]: 'Audio',
};

export const defaultTexts = {
  positiveAnswer: 'Yes',
  negativeAnswer: 'No',
  signatureDisclaimer:
    'I have had the opportunity to ask the site investigator any and all questions I have, and all of my questions have been resolved to my satisfaction.',
};

export const textLengthCap = {
  singleLine: 40,
  multiLines: 240,
};
