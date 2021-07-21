import Grid from '@material-ui/core/Grid';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import React from 'react';
import { blockTypes } from '../../../constants';
import { useQuestionDataChangeManager } from '../../hooks';
import BlockWrapper from '../../section/section-block/block-wrapper';
import BlockMenu from '../block-menu';
import InputWrapper from '../input-wrapper/input-wrapper';
import BooleanInput from './components/boolean-input';
import DropdownInput from './components/dropdown-input';
import FreeText from './components/free-text';
import MultiselectInput from './components/multiselect-input';
import NumberInput from './components/number-input';
import ScaleInput from './components/scale-input';
import SingleSelectInput from './components/single-select-input';
import SectionBlockTypeSelect from './section-block-type-select';

const QuestionBase = ({ block, onChange, onDelete, onDuplicate, draggableIndicator }) => {
  const { getDefaultPropsForNewBlock } = useQuestionDataChangeManager();

  const handleTypeChange = (type) => {
    const updated = { ...block, type, ...getDefaultPropsForNewBlock(type, block) };
    onChange(updated);
  };

  const renderQuestion = () => {
    switch (block.type) {
      case blockTypes.yesno:
        return <BooleanInput block={block} onChange={onChange} />;
      case blockTypes.number:
        return <NumberInput block={block} onChange={onChange} />;
      case blockTypes.multiselect:
        return <MultiselectInput block={block} onChange={onChange} />;
      case blockTypes.singleselect:
        return <SingleSelectInput block={block} onChange={onChange} />;
      case blockTypes.dropdown:
        return <DropdownInput block={block} onChange={onChange} />;
      case blockTypes.scale:
        return <ScaleInput block={block} onChange={onChange} />;
      case blockTypes.freetext:
        return <FreeText block={block} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <BlockWrapper
      title="Question"
      rightHeader={
        <>
          <Grid item>
            <SectionBlockTypeSelect blockType={block.type} setBlockType={handleTypeChange} />
          </Grid>
          <BlockMenu onDelete={() => onDelete(block)} onDuplicate={() => onDuplicate(block)} />
        </>
      }
      draggableIndicator={draggableIndicator}
    >
      <InputWrapper block={block} onChange={onChange}>
        {renderQuestion()}
      </InputWrapper>
    </BlockWrapper>
  );
};

export default QuestionBase;
