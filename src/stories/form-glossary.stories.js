import FormBuilderGlossary from '../lib/form-builder-glossary';
import previewMockData from '../data/previewMockData.json';

const config = {
  title: 'FormBuilder/Glossaries',
};

export default config;
const DefaultGlossaryForm = (args) => {
  return <FormBuilderGlossary {...args} />;
};

export const FullGlossary = DefaultGlossaryForm.bind({});
FullGlossary.args = {
  initialData: previewMockData,
  glossary: [
    { term: 'typesetting', explanation: 'Explanation typesetting' },
    { term: '1500s', explanation: 'explanation year' },
  ],
};

export const EmptyGlossary = DefaultGlossaryForm.bind({});
EmptyGlossary.args = {
  initialData: previewMockData,
};

export const OnChangeGlossary = DefaultGlossaryForm.bind({});

OnChangeGlossary.args = {
  initialData: previewMockData,
  onChange(glossary) {
    console.log(`Glossary changed ${JSON.stringify(glossary, undefined, 2)}`);
  },
};
