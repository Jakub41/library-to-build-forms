import React, { useMemo } from 'react';
import {
  addAdditionalPropertiesToData,
  addGlossaryToData,
  mapLocalFormatToApi,
  stripAdditionalPropertiesFromData,
  stripGlossaryFromData,
} from '../utils/utils';

export const actionTypes = {
  response: 'RESPONSE',
  nextPage: 'NEXT_PAGE',
  saveResult: 'SAVE_RESULT',
};

export function previewReducer(state, action) {
  switch (action.type) {
    case actionTypes.response: {
      const sections = state.sections.concat();
      const section = sections[action.block.sectionIndex];
      const blocks = section.blocks.concat();
      blocks[action.block.blockIndex] = {
        ...blocks[action.block.blockIndex],
        answer: action.block?.answer || undefined,
        freeTextAnswer: action.block?.freeTextAnswer || undefined,
        answerTimestamp: action.block?.answerTimestamp || undefined,
        user: action.block?.user || undefined,
        disclaimerChecked: action.block?.disclaimerChecked || undefined,
      };
      sections[action.block.sectionIndex] = { ...sections[action.block.sectionIndex], blocks };
      return { ...state, sections };
    }
    default: {
      return state;
    }
  }
}

export const prepareDataForSave = (data) => {
  const noGlossary = stripGlossaryFromData(data);
  const noAdditionalProps = stripAdditionalPropertiesFromData(noGlossary);
  return mapLocalFormatToApi(noAdditionalProps);
};

export default function usePreview(formData, glossary, reducer = previewReducer) {
  const dataWithIds = useMemo(() => addAdditionalPropertiesToData(formData), [formData]);
  const dataWithGlossary = useMemo(() => addGlossaryToData(dataWithIds, glossary), [dataWithIds, glossary]);
  const [data, dispatch] = React.useReducer(reducer, dataWithGlossary);

  return { data, dispatch };
}
