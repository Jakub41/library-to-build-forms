import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect } from 'react';
import { blockTypes } from '../../../constants';
import { getMarkdownCss } from '../../theme/helper';
import Audio from './Audio';
import YesNo from './Boolean';
import Dropdown from './Dropdown';
import FreeText from './FreeText';
import Image from './Image';
import SignatureLandscapeOnly from './LandscapeSignature';
import MultiSelect from './MultiSelect';
import NumberBlock from './NumberBlock';
import Pdf from './Pdf';
import Scale from './Scale';
import styles from './SectionBlock.styles';
import Signature from './Signature';
import SingleSelect from './SingleSelect';
import Video from './Video';

const components = {
  [blockTypes.textBlock]: ({ block, onChange }) => {
    useEffect(() => onChange({ ...block, answer: true }), []);
    return null;
  },
  [blockTypes.dropdown]: Dropdown,
  [blockTypes.multiselect]: MultiSelect,
  [blockTypes.singleselect]: SingleSelect,
  [blockTypes.number]: NumberBlock,
  [blockTypes.signature]: (props) => {
    if (props.block.options.forceLandscapeMode) {
      return <SignatureLandscapeOnly {...props} />;
    } else {
      return <Signature {...props} />;
    }
  },
  [blockTypes.yesno]: YesNo,
  [blockTypes.freetext]: FreeText,
  [blockTypes.scale]: Scale,
  [blockTypes.video]: Video,
  [blockTypes.audio]: Audio,
  [blockTypes.image]: Image,
  [blockTypes.pdf]: Pdf,
};

const SectionBlock = ({
  classes,
  block,
  onChange,
  currentUser,
  theme,
  readOnly,
}) => {
  const options = block.options || {};
  const Component = components[block.type];

  return (
    <div
      className={`${classes.root} section-block-root ${
        options.isHighlighted ? classes.highlight : ''
      }`}
    >
      <style>{getMarkdownCss('section-block-root', theme)}</style>
      <div>
        <Typography variant="subtitle1">
          {block.titleWithExplanations}
        </Typography>
      </div>
      <div className={classes.bodyContainer}>
        <Viewer
          frontMatter={true}
          initialValue={block.bodyWithExplanations}
          initialEditType="markdown"
        />
      </div>
      <Component
        block={block}
        onChange={onChange}
        currentUser={currentUser}
        readOnly={readOnly}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SectionBlock);
