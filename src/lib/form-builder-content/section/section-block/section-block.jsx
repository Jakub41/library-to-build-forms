import React, { useMemo } from "react";
import { blockTypes } from "../../../constants";
import MediaContent from "../../components/media-content";
import QuestionBase from "../../components/question-base";
import Signature from "../../components/signature";
import TextBlock from "../../components/text-block";

const SectionBlock = ({
  block,
  signatureOptions,
  onChange,
  onDelete,
  onDuplicate,
  draggableIndicator,
}) => {
  const mediaTypeValues = useMemo(
    () => [
      blockTypes.video,
      blockTypes.audio,
      blockTypes.pdf,
      blockTypes.image,
    ],
    []
  );
  const questionTypes = useMemo(
    () => [
      blockTypes.freetext,
      blockTypes.multiselect,
      blockTypes.yesno,
      blockTypes.singleselect,
      blockTypes.number,
      blockTypes.dropdown,
      blockTypes.scale,
    ],
    []
  );
  if (block.type === blockTypes.textBlock) {
    return (
      <TextBlock
        block={block}
        onChange={onChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        draggableIndicator={draggableIndicator}
      />
    );
  }

  if (
    block.type === blockTypes.question ||
    questionTypes.includes(block.type)
  ) {
    return (
      <QuestionBase
        block={block}
        onChange={onChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        draggableIndicator={draggableIndicator}
      />
    );
  }

  if (block.type === blockTypes.media || mediaTypeValues.includes(block.type)) {
    return (
      <MediaContent
        block={block}
        onChange={onChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        draggableIndicator={draggableIndicator}
      />
    );
  }

  if (block.type === blockTypes.signature) {
    return (
      <Signature
        block={block}
        onChange={onChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        draggableIndicator={draggableIndicator}
        roles={signatureOptions.roles}
      />
    );
  }
};

export default SectionBlock;
