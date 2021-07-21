import * as React from "react";
import { blockTypes, defaultTexts } from "../../constants";
import { generateUUID } from "../../utils";
import {
  addAdditionalPropertiesToData,
  filterUndefinedBlockTypesEntries,
  mapLocalFormatToApi,
  reIndexBlocks,
  reIndexSections,
  stripAdditionalPropertiesFromData,
  stripEmptyAnswersFromMultipleAnswerQuestions,
} from "../../utils/utils";
import { slugify } from "../utils/slugify";

const getEmptySection = () => ({
  title: "",
  body: "",
  blocks: [],
});

const getEmptyBlock = () => {
  const uuid = generateUUID();
  return {
    formBuilderContextId: uuid,
    key: uuid,
    title: "",
    body: "",
    items: [],
    meta: {},
  };
};

const UPDATE_FORM_TITLE = "UPDATE_FORM_TITLE";
const UPDATE_FORM_BODY = "UPDATE_FORM_BODY";
const UPDATE_FORM_OPTION = "UPDATE_FORM_OPTION";
const ADD_SECTION_ON_TOP = "ADD_SECTION_ON_TOP";
const ADD_SECTION_AFTER_SECTION = "ADD_SECTION_AFTER_SECTION";
const ADD_PAGE_BREAK = "ADD_PAGE_BREAK";
const UPDATE_SECTION = "UPDATE_SECTION";
const DELETE_PAGE_BREAK = "DELETE_PAGE_BREAK";
const DELETE_SECTION = "DELETE_SECTION";
const ADD_BLOCK = "ADD_BLOCK";
const UPDATE_BLOCK = "UPDATE_BLOCK";
const DUPLICATE_BLOCK = "DUPLICATE_BLOCK";
const DELETE_BLOCK = "DELETE_BLOCK";

export const actions = {
  UPDATE_FORM_TITLE,
  UPDATE_FORM_BODY,
  UPDATE_FORM_OPTION,
  ADD_SECTION_ON_TOP,
  ADD_SECTION_AFTER_SECTION,
  ADD_PAGE_BREAK,
  UPDATE_SECTION,
  DELETE_PAGE_BREAK,
  DELETE_SECTION,
  ADD_BLOCK,
  UPDATE_BLOCK,
  DUPLICATE_BLOCK,
  DELETE_BLOCK,
};

export const actionCreators = {
  updateFormTitle: (title) => ({
    type: UPDATE_FORM_TITLE,
    title,
  }),
  updateFormBody: (body) => ({
    type: UPDATE_FORM_BODY,
    body,
  }),
  updateFormOption: (options) => ({
    type: UPDATE_FORM_OPTION,
    options,
  }),
  addSectionOnTop: () => ({
    type: ADD_SECTION_ON_TOP,
  }),
  addSectionAfterSection: (sectionAbove) => ({
    type: ADD_SECTION_AFTER_SECTION,
    sectionAbove,
  }),
  addPageBreak: (section, blockIndex) => ({
    type: ADD_PAGE_BREAK,
    section,
    blockIndex,
  }),
  deletePageBreak: (section) => ({
    type: DELETE_PAGE_BREAK,
    section,
  }),
  deleteSection: (section) => ({
    type: DELETE_SECTION,
    section,
  }),
  updateSection: (section) => ({
    type: UPDATE_SECTION,
    section,
  }),
  addBlock: (sectionIndex, blockType, afterBlockIndex) => ({
    type: ADD_BLOCK,
    sectionIndex,
    blockType,
    afterBlockIndex,
  }),
  updateBlock: (block) => ({
    type: UPDATE_BLOCK,
    block,
  }),
  duplicateBlock: (block) => ({
    type: DUPLICATE_BLOCK,
    block,
  }),
  deleteBlock: (block) => ({
    type: DELETE_BLOCK,
    block,
  }),
};

export function builderReducer(currentState, action) {
  const state = JSON.parse(JSON.stringify(currentState));
  switch (action.type) {
    case UPDATE_FORM_TITLE:
      return { ...currentState, title: action.title };
    case UPDATE_FORM_BODY:
      return { ...currentState, body: action.body };
    case UPDATE_FORM_OPTION:
      return { ...currentState, options: { ...action.options } };
    case ADD_SECTION_ON_TOP: {
      const sections = state.sections.concat();
      const newSection = getEmptySection();
      sections.unshift(newSection);
      reIndexSections(sections, true);
      return { ...currentState, sections };
    }
    case ADD_SECTION_AFTER_SECTION: {
      const sections = state.sections.concat();
      const newSection = getEmptySection();
      sections.splice(action.sectionAbove.sectionIndex + 1, 0, newSection);
      reIndexSections(sections, true);
      return { ...currentState, sections };
    }
    case ADD_PAGE_BREAK: {
      const sections = state.sections.concat();
      let currentSection = { ...sections[action.section.sectionIndex] };
      const firstBlockHalf = currentSection.blocks.slice(
        0,
        action.blockIndex + 1
      );
      firstBlockHalf.forEach(
        (b) => (b.sectionIndex = action.section.sectionIndex)
      );
      const secondBlockHalf = currentSection.blocks.slice(
        action.blockIndex + 1,
        currentSection.blocks.length
      );
      secondBlockHalf.forEach(
        (b) => (b.sectionIndex = action.section.sectionIndex + 1)
      );
      currentSection = { ...currentSection, blocks: firstBlockHalf };

      const newSection = {
        ...getEmptySection(),
        blocks: secondBlockHalf,
      };

      sections[action.section.sectionIndex] = currentSection;
      sections.splice(action.section.sectionIndex + 1, 0, newSection);
      reIndexSections(sections, true);
      return { ...currentState, sections };
    }
    case UPDATE_SECTION: {
      const sections = state.sections.concat();
      sections[action.section.sectionIndex] = action.section;
      return { ...currentState, sections };
    }
    case DELETE_PAGE_BREAK: {
      const sections = state.sections.concat();
      const previousSection = sections[action.section.sectionIndex - 1];
      const deletedSection = sections[action.section.sectionIndex];
      previousSection.blocks = [
        ...previousSection.blocks,
        ...deletedSection.blocks,
      ];
      reIndexBlocks(previousSection.blocks, previousSection.sectionIndex);
      sections.splice(action.section.sectionIndex, 1);
      reIndexSections(sections, true);
      return { ...currentState, sections };
    }
    case DELETE_SECTION: {
      const sections = state.sections.concat();
      sections.splice(action.section.sectionIndex, 1);
      reIndexSections(sections, true);
      return { ...currentState, sections };
    }
    case ADD_BLOCK: {
      const sections = state.sections.concat();
      const blocks = sections[action.sectionIndex].blocks.concat();
      let options = {};
      let recipient = undefined;
      if (action.blockType === blockTypes.yesno) {
        options = {
          trueValue: defaultTexts.positiveAnswer,
          falseValue: defaultTexts.negativeAnswer,
          trueValueIsMandatory: false,
          falseValueIsMandatory: false,
        };
      }
      if (action.blockType === blockTypes.signature) {
        recipient = { role: "CONSENTEE" };
        options = {
          disclaimer: defaultTexts.signatureDisclaimer,
        };
      }
      const newBlock = {
        ...getEmptyBlock(),
        type: action.blockType,
        options,
        recipient,
        sectionIndex: action.sectionIndex,
      };
      blocks.splice(action.afterBlockIndex + 1, 0, newBlock);
      reIndexBlocks(blocks, action.sectionIndex);
      sections[action.sectionIndex].blocks = blocks;
      return { ...currentState, sections };
    }
    case UPDATE_BLOCK: {
      const sections = state.sections.concat();
      const blocks = sections[action.block.sectionIndex].blocks.concat();
      blocks[action.block.blockIndex] = validateBlock(action.block);
      sections[action.block.sectionIndex].blocks = blocks;
      return { ...currentState, sections };
    }
    case DUPLICATE_BLOCK: {
      const sections = state.sections.concat();
      const blocksCopy = sections[action.block.sectionIndex].blocks.concat();
      const newBlock = {
        ...action.block,
        key: slugify(action.block.title),
        formBuilderContextId: generateUUID(),
        sectionIndex: action.block.sectionIndex,
        meta: { ...action.block.meta },
      };
      blocksCopy.splice(action.block.blockIndex + 1, 0, newBlock);
      reIndexBlocks(blocksCopy, action.block.sectionIndex);
      sections[action.block.sectionIndex] = {
        ...sections[action.block.sectionIndex],
        blocks: blocksCopy,
      };
      return { ...currentState, sections: sections };
    }
    case DELETE_BLOCK: {
      const sections = state.sections.concat();
      const blocks = sections[action.block.sectionIndex].blocks.concat();
      blocks.splice(action.block.blockIndex, 1);
      reIndexBlocks(blocks, action.block.sectionIndex);
      sections[action.block.sectionIndex].blocks = blocks;
      return { ...currentState, sections };
    }
    default:
      return currentState;
  }
}

const validateBlock = (block) => {
  if (block.type !== "signature") {
    return block;
  }

  if (block.options.reason === "") {
    return { ...block, meta: { ...block.meta, valid: false } };
  } else {
    return { ...block, meta: { ...block.meta, valid: true } };
  }
};

export const prepareDataForSave = (data) => {
  const noEmptyAnswerData = stripEmptyAnswersFromMultipleAnswerQuestions(data);
  const noTypelessBlockSections = filterUndefinedBlockTypesEntries(
    noEmptyAnswerData
  );
  const cleanData = stripAdditionalPropertiesFromData(noTypelessBlockSections);
  const updatedFormatData = mapLocalFormatToApi(cleanData);
  return updatedFormatData;
};

export default function useBuilder(initialData, reducer = builderReducer) {
  const form = React.useMemo(() => addAdditionalPropertiesToData(initialData), [
    initialData,
  ]);
  const [data, dispatch] = React.useReducer(reducer, form);
  return { data, dispatch };
}
