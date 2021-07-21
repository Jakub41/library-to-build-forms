import { withStyles, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';
import HttpUtil from '../../../utils/httpUtil';
import BlockWrapper from '../../section/section-block/block-wrapper';
import BlockMenu from '../block-menu';
import DropZone from '../dropzone';
import MediaWrapper from '../media-wrapper/media-wrapper';
import Visible from '../visible';
import AudioContent from './components/audio-content';
import ImageContent from './components/image-content';
import PdfContent from './components/pdf-content';
import VideoContent from './components/video-content';
import styles from './media-content.styles';
import matchMimeTypesRegex from '../../../utils/matchMimeTypesRegex';
import Typography from '@material-ui/core/Typography';
import { blockTypes, blockTypeNames } from '../../../constants';
import StorageUtil from '../../../utils/storageUtil';

const MediaContent = ({ block, onChange, onDelete, onDuplicate, draggableIndicator, classes }) => {
  const [isUploading, setIsUploading] = useState(false);
  const getBlockTypeBasedOnFileType = useCallback((fileType) => {
    const fileData = matchMimeTypesRegex(fileType);
    if (fileType === 'application/pdf') {
      return blockTypes.pdf;
    }
    switch (fileData.type) {
      case 'audio':
        return blockTypes.audio;
      case 'video':
        return blockTypes.video;
      case 'image':
        return blockTypes.image;
      default:
        return blockTypes.media;
    }
  }, []);

  const renderMedia = (type) => {
    switch (type) {
      case blockTypes.image:
        return <ImageContent block={block} onChange={onChange} />;
      case blockTypes.pdf:
        return <PdfContent block={block} onChange={onChange} />;
      case blockTypes.video:
        return <VideoContent block={block} onChange={onChange} />;
      case blockTypes.audio:
        return <AudioContent block={block} onChange={onChange} />;
      default:
        return null;
    }
  };

  const onDropWithS3 = async (acceptedFiles) => {
    setIsUploading(true);
    const type = getBlockTypeBasedOnFileType(acceptedFiles[0].type);
    const key = acceptedFiles[0].path;
    try {
      const data = new FormData();
      data.append('files', acceptedFiles[0]);
      const uploadResult = await StorageUtil.upload(data);
      console.log(uploadResult);
      onChange({ ...block, type, items: [{ source: uploadResult.Location, key, fileId: uploadResult.fileId }] });
      setIsUploading(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const source = reader.result;
      const type = getBlockTypeBasedOnFileType(acceptedFiles[0].type);
      const key = acceptedFiles[0].path;
      const updated = { ...block, type, items: [{ source, key }] };
      onChange(updated);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  return (
    <BlockWrapper
      title="Media"
      rightHeader={
        <>
          <Grid item>
            <Typography variant="overline">{blockTypeNames[block.type]}</Typography>
          </Grid>
          <BlockMenu onDelete={() => onDelete(block)} onDuplicate={() => onDuplicate(block)} />
        </>
      }
      draggableIndicator={draggableIndicator}
    >
      <MediaWrapper block={block} onChange={onChange}>
        <Grid item className={classes.gridItemMediaContainer}>
          <Visible when={isUploading}>
            <LinearProgress />
          </Visible>
          <Visible when={block.items?.length} fallBack={<DropZone onDrop={onDropWithS3} />}>
            {renderMedia(block.type)}
          </Visible>
        </Grid>
      </MediaWrapper>
    </BlockWrapper>
  );
};

export default withStyles(styles, { withTheme: true })(MediaContent);
