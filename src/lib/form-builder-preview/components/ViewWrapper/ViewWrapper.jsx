import { withStyles } from '@material-ui/styles';
import { Viewer } from '@toast-ui/react-editor';
import React, { useRef } from 'react';
import { getMarkdownCss } from '../../theme/helper';
import styles from './ViewWrapper.styles';

const ViewWrapper = ({
  classes,
  previewTheme,
  initialValue,
  customClassName,
  isSelectionMode,
}) => {
  const viewerRef = useRef(null);

  if (viewerRef && viewerRef.current && !isSelectionMode) {
    const instance = viewerRef.current.getInstance();
    if (instance.mardownValue !== initialValue) {
      instance.setMarkdown(initialValue);
    }
  }

  return (
    <div className={`${classes.body} ${customClassName}`}>
      <style>{getMarkdownCss(customClassName, previewTheme)}</style>
      <Viewer
        ref={viewerRef}
        initialValue={initialValue}
        initialEditType="markdown"
      />
    </div>
  );
};

export default withStyles(styles)(ViewWrapper);
