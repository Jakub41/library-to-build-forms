import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import JsonDiffReact from 'jsondiffpatch-for-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../lib/compiled-lang/en.json';
import demoMockData from '../data/demo/mockData.json';
import demoMockTheme from '../data/demo/mockTheme.json';
import signaturesMockData from '../data/demo/signaturesMockData.json';
import previewMockData from '../data/previewMockData.json';
import storiesMockData from '../data/storiesMockData.json';
import storiesMockDataWithAnswers from '../data/storiesMockDataWithAnswers.json';
import { preparePreviewData, previewActionTypes } from '../lib';
import Preview from '../lib/form-builder-preview';
import SectionBlock from '../lib/form-builder-preview/components/SectionBlock';
import {
  conversationMessageStatuses,
  conversationStatuses,
} from '../lib/form-builder-preview/constants/constants';
import {
  mockConversation,
  mockOnAddConsenteeMessage,
  mockOnAddUserMessage,
} from '../lib/form-builder-preview/constants/previewDefaultData.js';
import { previewReducer } from '../lib/form-builder-preview/usePreview';

const defaultTheme = createTheme();

const config = {
  title: 'FormBuilder/Preview',
};

const currentUser = {
  id: 'someIdHere',
  name: 'Dayo Hugo',
  role: 'CONSENTEE',
};

export default config;

const DefaultPreviewBuilder = (args) => {
  return (
    <div style={{ height: '100vh' }}>
      <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
        <ThemeProvider theme={defaultTheme}>
          <Preview
            currentUser={currentUser}
            {...args}
            onSubmit={(formWithAnswers) => console.warn(formWithAnswers)}
          />
        </ThemeProvider>
      </IntlProvider>
    </div>
  );
};

const LiveChatPreviewBuilder = (args) => {
  let [conversation, setConversation] = useState(mockConversation);
  const timeoutRef = useRef();

  const onAddMessage = useCallback(
    (content) =>
      new Promise((resolve, reject) => {
        mockOnAddConsenteeMessage(content, conversation.messages.nodes.length)
          .then((newMessage) =>
            setTimeout(() => {
              if (Math.random() < 0.25)
                return reject(new Error('Message sent unsuccessfully'));
              setConversation((current) => ({
                ...current,
                messages: { nodes: [...current.messages.nodes, newMessage] },
              }));
              resolve(newMessage);
            }, 200)
          )
          .catch(reject);
      }),
    []
  );

  const onViewConversation = useCallback(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setConversation((current) => ({
            ...current,
            status: conversationStatuses.default,
            messages: {
              nodes: current.messages.nodes.map((message) => ({
                ...message,
                status: conversationMessageStatuses.default,
              })),
            },
          }));
          resolve();
        }, 320);
      }),
    []
  );

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      mockOnAddUserMessage(conversation.messages.nodes.length).then(
        (message) => {
          const newMessage = {
            ...message,
            author: { id: 2, memberType: 'USER' },
          };
          setConversation((current) => ({
            ...current,
            status: conversationStatuses.pending,
            messages: { nodes: [...current.messages.nodes, newMessage] },
          }));
        }
      );
    }, 20000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  return (
    <div style={{ height: '100vh' }}>
      <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
        <ThemeProvider theme={defaultTheme}>
          <Preview
            {...args}
            onAddMessage={onAddMessage}
            onViewConversation={onViewConversation}
            conversation={conversation}
            onSubmit={(formWithAnswers) => console.warn(formWithAnswers)}
          />
        </ThemeProvider>
      </IntlProvider>
    </div>
  );
};

export const EmptyPreview = DefaultPreviewBuilder.bind({});
EmptyPreview.args = {};

export const FullPreviewDefault = DefaultPreviewBuilder.bind({});
FullPreviewDefault.args = {
  initialData: previewMockData,
  glossary: [
    {
      term: 'Voltaren Emulgel',
      explanation:
        'Voltaren Emulgel contains the non-steroidal anti-inflammatory drug ',
    },
    {
      term: 'Lorem Ipsum',
      explanation:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
  ],
};

export const FullPreviewReadOnly = DefaultPreviewBuilder.bind({});
FullPreviewReadOnly.args = {
  initialData: { ...previewMockData },
  readOnly: true,
};
FullPreviewReadOnly.args.initialData.pages[1].blocks[0].answer = 'No';
FullPreviewReadOnly.args.initialData.pages[2].blocks[0] = {
  ...signaturesMockData.pages[1].blocks[0],
};

const PreviewBuilder375x800 = (args) => {
  const width = 375;
  const height = 800;
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        left: `calc(50% - ${width / 2}px)`,
        top: `calc(50% - ${height / 2}px)`,
        border: 'solid black 10px',
        borderRadius: 10,
      }}
    >
      <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
        <ThemeProvider theme={defaultTheme}>
          <Preview
            currentUser={currentUser}
            {...args}
            onSubmit={(formWithAnswers) => console.warn(formWithAnswers)}
          />
        </ThemeProvider>
      </IntlProvider>
    </div>
  );
};

export const FullPreview375X800 = PreviewBuilder375x800.bind({});
FullPreview375X800.args = {
  initialData: previewMockData,
  glossary: [
    {
      term: 'Voltaren Emulgel',
      explanation:
        'Voltaren Emulgel contains the non-steroidal anti-inflammatory drug ',
    },
    {
      term: 'Lorem Ipsum',
      explanation:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
  ],
};

export const DemoPreviewDefault = DefaultPreviewBuilder.bind({});
DemoPreviewDefault.args = {
  initialData: demoMockData,
  theme: demoMockTheme,
  onSubmit: (data) => console.log(JSON.stringify(data)),
};

export const LiveChatPreview = LiveChatPreviewBuilder.bind({});
LiveChatPreview.args = {
  initialData: demoMockData,
  theme: demoMockTheme,
  onSubmit: (data) => console.log(JSON.stringify(data)),
};

export const SignaturesPreviewDefault = DefaultPreviewBuilder.bind({});
SignaturesPreviewDefault.args = {
  initialData: signaturesMockData,
  theme: demoMockTheme,
  glossary: [
    { term: 'Example', explanation: 'This is an example of highlighting' },
  ],
  onSubmit: (data) => console.log(JSON.stringify(data)),
  onPdfDownload: () => console.log('download PDF'),
};

const CustomReducerPreview = (args) => {
  const reducer = useCallback((state, action) => {
    const newState = previewReducer(state, action);
    if (
      action.type === previewActionTypes.nextPage ||
      action.type === previewActionTypes.response
    ) {
      const dataToStore = preparePreviewData(newState);
      console.log(dataToStore);
    }
    return newState;
  }, []);
  const result = (
    <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
      <ThemeProvider theme={defaultTheme}>
        <Preview
          initialData={args.form}
          reducer={reducer}
          onSubmit={(formWithAnswers) => console.warn(formWithAnswers)}
        />
      </ThemeProvider>
    </IntlProvider>
  );
  return result;
};

export const FullPreviewCustomReducer = CustomReducerPreview.bind({});
FullPreviewCustomReducer.args = { form: demoMockData };

const CodePreview = ({ title, children, jsonContent, expanded, onChange }) => (
  <Accordion
    expandIcon={<ExpandMoreIcon />}
    expanded={expanded}
    onChange={onChange}
  >
    <AccordionSummary>
      <Typography variant="button">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails
      style={{ backgroundColor: '#f7f7f7', borderTop: 'solid #ddd 1px' }}
    >
      {children}
      {jsonContent && (
        <pre>
          <code>{JSON.stringify(jsonContent, null, 2)}</code>
        </pre>
      )}
    </AccordionDetails>
  </Accordion>
);

const Builder = (args) => {
  const [block, setBlock] = useState(args);
  const [expanded, setExpanded] = useState({
    original: false,
    updated: false,
    diff: true,
  });
  const toggle = (key) => () => setExpanded((x) => ({ ...x, [key]: !x[key] }));

  return (
    <IntlProvider messages={enMessages} defaultLocale="en" locale="en">
      <ThemeProvider theme={createTheme(demoMockTheme)}>
        <SectionBlock
          block={block}
          currentUser={currentUser}
          onChange={setBlock}
          readOnly={args.readOnly}
        />

        <Paper style={{ margin: 'auto 20px' }}>
          <CodePreview
            title="Diff between original and updated data"
            expanded={expanded.diff}
            onChange={toggle('diff')}
          >
            <JsonDiffReact left={args} right={block} />
          </CodePreview>
          <CodePreview
            title="Original data"
            jsonContent={args}
            expanded={expanded.original}
            onChange={toggle('original')}
          />
          <CodePreview
            title="Updated data"
            jsonContent={block}
            expanded={expanded.updated}
            onChange={toggle('updated')}
          />
        </Paper>
      </ThemeProvider>
    </IntlProvider>
  );
};

export const FreeText = Builder.bind({});
FreeText.args = { ...storiesMockData[0] };

export const FreeTextReadonly = Builder.bind({});
FreeTextReadonly.args = {
  ...storiesMockDataWithAnswers[0],
  readOnly: true,
};

export const FreeTextWithAnswer = Builder.bind({});
FreeTextWithAnswer.args = {
  ...storiesMockData[0],
  answer: 'some short answer',
};

export const Boolean = Builder.bind({});
Boolean.args = { ...storiesMockData[1] };

export const BooleanReadOnly = Builder.bind({});
BooleanReadOnly.args = { ...storiesMockDataWithAnswers[1], readOnly: true };

export const BooleanWithAnswer = Builder.bind({});
BooleanWithAnswer.args = { ...storiesMockData[1], answer: 'Positive' };

export const MultiSelect = Builder.bind({});
MultiSelect.args = { ...storiesMockData[2] };

export const MultiSelectReadOnly = Builder.bind({});
MultiSelectReadOnly.args = { ...storiesMockDataWithAnswers[2], readOnly: true };

export const MultiSelectWithAnswers = Builder.bind({});
MultiSelectWithAnswers.args = {
  ...storiesMockDataWithAnswers[2],
};

export const SingleSelect = Builder.bind({});
SingleSelect.args = { ...storiesMockData[3] };

export const SingleSelectReadOnly = Builder.bind({});
SingleSelectReadOnly.args = {
  ...storiesMockDataWithAnswers[3],
  readOnly: true,
};

export const SingleSelectWithAnswer = Builder.bind({});
SingleSelectWithAnswer.args = { ...storiesMockData[3], answer: 'item-a' };

export const SingleSelectWithFreeTextAnswer = Builder.bind({});
SingleSelectWithFreeTextAnswer.args = {
  ...storiesMockDataWithAnswers[3],
};

export const Dropdown = Builder.bind({});
Dropdown.args = { ...storiesMockData[4] };

export const DropdownReadOnly = Builder.bind({});
DropdownReadOnly.args = { ...storiesMockDataWithAnswers[4], readOnly: true };

export const DropdownWithAnswer = Builder.bind({});
DropdownWithAnswer.args = { ...storiesMockDataWithAnswers[4] };

export const Number = Builder.bind({});
Number.args = { ...storiesMockData[5] };

export const NumberReadOnly = Builder.bind({});
NumberReadOnly.args = { ...storiesMockDataWithAnswers[5], readOnly: true };

export const NumberWithAnswer = Builder.bind({});
NumberWithAnswer.args = { ...storiesMockData[5], answer: 7 };

export const Scale = Builder.bind({});
Scale.args = { ...storiesMockData[6] };

export const ScaleReadOnly = Builder.bind({});
ScaleReadOnly.args = { ...storiesMockDataWithAnswers[6], readOnly: true };

export const ScaleWithAnswer = Builder.bind({});
ScaleWithAnswer.args = { ...storiesMockDataWithAnswers[6] };

export const TextBlock = Builder.bind({});
TextBlock.args = { ...storiesMockData[7] };

export const Video = Builder.bind({});
Video.args = { ...storiesMockData[8] };

export const Audio = Builder.bind({});
Audio.args = { ...storiesMockData[9] };

export const Image = Builder.bind({});
Image.args = { ...storiesMockData[10] };

export const Pdf = Builder.bind({});
Pdf.args = { ...storiesMockData[11] };

export const OwnSignature = Builder.bind({});
OwnSignature.args = { ...storiesMockData[12] };

export const OwnSignatureReadOnly = Builder.bind({});
OwnSignatureReadOnly.args = { ...storiesMockDataWithAnswers[13] };

export const OtherSignature = Builder.bind({});
OtherSignature.args = { ...storiesMockData[13] };
