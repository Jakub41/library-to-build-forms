import { withStyles } from '@material-ui/styles';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import React, { useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './text-input.css';

const toolbarItems = [['italic', 'bold', 'ul', 'ol']];

const TextInput = ({ value, label, onChange, ...rest }) => {
  const editor = useRef();
  const { value: editorValue, setValue: setEditorValue } = useDebounce(
    value,
    200,
    { onChange }
  );
  const handleChange = () => {
    setEditorValue(editor.current.getInstance?.().getMarkdown());
  };

  return (
    <div className="form-builder-editor-root">
      <Editor
        height="auto"
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        initialEditType="wysiwyg"
        placeholder="Add body text (optional)"
        initialValue={editorValue}
        usageStatistics={false}
        onChange={handleChange}
        minHeight={0}
        previewStyle={{ backgroundColor: 'red' }}
        ref={editor}
      />
    </div>
  );
};

export default withStyles({}, { withTheme: true })(TextInput);
