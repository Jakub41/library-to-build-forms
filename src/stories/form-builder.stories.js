import { ThemeProvider } from '@material-ui/core';
import { useCallback, useState } from 'react';
import mockData from '../data/mockData.json';
import { blockTypes } from '../lib/constants';
import FormBuilderContent from '../lib/form-builder-content';
import SectionBlock from '../lib/form-builder-content/section/section-block';
import theme from '../lib/form-builder-content/theme/theme';
import {
  actions,
  builderReducer,
} from '../lib/form-builder-content/useBuilder';
import defaultRoles from '../lib/utils/defaultRoles';

const config = {
  title: 'FormBuilder/Builder',
};

export default config;

const FormBuilder = (args) => <FormBuilderContent {...args} theme={theme} />;

export const FullBuilder = FormBuilder.bind({});
FullBuilder.args = {
  initialData: mockData,
  uploadServiceUrl: 'https://uploads.xxx.xyz/api',
};

const CustomReducerFormBuilder = (args) => {
  const reducer = useCallback((state, action) => {
    const newState = builderReducer(state, action);
    if (action.type === actions.UPDATE_FORM_TITLE) {
      if (!newState.title.includes('[Custom Reducer]')) {
        return { ...newState, title: '[Custom Reducer] ' + newState.title };
      }
    }
    return newState;
  }, []);
  return (
    <FormBuilderContent initialData={args.initialData} reducer={reducer} />
  );
};

export const CustomReducerBuilder = CustomReducerFormBuilder.bind({});
FullBuilder.CustomReducerBuilder = {
  initialData: mockData,
  uploadServiceUrl: 'https://uploads.xxx.xyz/api',
};

const SectionBlockContainer = ({ block, ...rest }) => {
  const [theBlock, onChange] = useState(block);
  return (
    <ThemeProvider theme={theme}>
      <SectionBlock block={theBlock} onChange={onChange} {...rest} />
    </ThemeProvider>
  );
};

export const TextQuestion = (args) => <SectionBlockContainer {...args} />;
TextQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.freetext,
    options: { placeholder: 'Custom placeholder…' },
  },
};

export const BooleanQuestion = (args) => <SectionBlockContainer {...args} />;
BooleanQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.yesno,
    options: { trueValue: 'Yes', falseValue: 'No' },
  },
};

export const MultiSelectQuestion = (args) => (
  <SectionBlockContainer {...args} />
);
MultiSelectQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.multiselect,
    items: [
      { key: 'is_mandatory_key', value: 'Mandatory', isMandatory: false },
      {
        key: 'is_mandatory_key',
        value: 'Mandatory',
        isMandatory: false,
      },
    ],
  },
};

export const SingleSelectQuestion = (args) => (
  <SectionBlockContainer {...args} />
);
SingleSelectQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.singleselect,
    items: [
      { key: 'item-1', value: 'Item 1', isMandatory: false },
      { key: 'item-2', value: 'item 2', isMandatory: false },
    ],
  },
};

export const DropDownQuestion = (args) => <SectionBlockContainer {...args} />;
DropDownQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.dropdown,
    items: [
      { key: 'item-1', value: 'Item 1', isMandatory: false },
      { key: 'item-2', value: 'item 2', isMandatory: false },
    ],
  },
};

export const NumberQuestion = (args) => <SectionBlockContainer {...args} />;
NumberQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.number,
    options: { minValue: 0, maxValue: 10 },
  },
};

export const ScaleQuestion = (args) => <SectionBlockContainer {...args} />;
ScaleQuestion.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.scale,
    options: {
      minValue: 0,
      maxValue: 10,
      minValueText: 'Min',
      maxValueText: 'Max',
    },
  },
};

export const TextBlock = (args) => <SectionBlockContainer {...args} />;
TextBlock.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.textBlock,
    options: {},
  },
};

export const Signature = (args) => <SectionBlockContainer {...args} />;
Signature.args = {
  block: {
    title: 'Add Title',
    body: 'Add body',
    type: blockTypes.signature,
    options: { reason: 'why did you sign' },
  },
  signatureOptions: {
    roles: defaultRoles,
  },
};
