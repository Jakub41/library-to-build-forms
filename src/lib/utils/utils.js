import React from "react"; // Due to the glossary span elements
import { generateUUID } from ".";
import { blockTypes } from "../constants";
import StorageUtil from "./storageUtil";

// Used by react key
const addIdsToData = (data) => {
  const copyData = JSON.parse(JSON.stringify(data));

  for (const section of copyData.sections) {
    section.previewId = generateUUID();
    for (const block of section.blocks) {
      block.previewId = generateUUID();
    }
  }

  return copyData;
};

//Added for quick access
const addIndicesToData = (data) => {
  const copyData = { ...data };

  for (const sectionIndex in data.sections) {
    const section = data.sections[sectionIndex];
    section.sectionIndex = sectionIndex;
    for (const block of section.blocks) {
      block.sectionIndex = sectionIndex;
      block.blockIndex = block.sortOrder;
    }
  }

  return copyData;
};

// TODO: User API format throughout the app
export const mapLocalFormatToApi = (form) => {
  if (form) {
    form.pages = form.sections.map((s) => ({
      ...s,
      blocks: s.blocks.map(({ meta, ...rest }) => rest),
    }));

    delete form.sections;
  }
  return form;
};

// TODO: User API format throughout the app
export const mapApiFormatToLocal = (form) => {
  if (form) {
    form.sections = form.pages.map((s) => ({
      ...s,
      blocks: s.blocks.map((b) => ({ meta: {}, ...b })),
    }));
    delete form.pages;
  }
  return form;
};

export const cleanCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const addAdditionalPropertiesToData = (data) => {
  let result = cleanCopy(data);
  result = mapApiFormatToLocal(result);
  result = addIdsToData(result);
  result = addIndicesToData(result);
  reIndexSections(result.sections, true);

  return result;
};

const stripIdsFromData = (data) => {
  const copyData = JSON.parse(JSON.stringify(data));

  for (const section of copyData.sections) {
    section.previewId && delete section.previewId;
    section.formBuilderContextId && delete section.formBuilderContextId;
    for (const block of section.blocks) {
      block.previewId && delete block.previewId;
      block.formBuilderContextId && delete block.formBuilderContextId;
    }
  }
  return copyData;
};

const stripIndicesFromData = (data) => {
  const copyData = JSON.parse(JSON.stringify(data));

  for (const sectionIndex in copyData.sections) {
    const section = copyData.sections[sectionIndex];
    delete section.sectionIndex;
    for (const block of section.blocks) {
      delete block.sectionIndex;
      delete block.blockIndex;
    }
  }
  return copyData;
};

export const filterUndefinedBlockTypesEntries = (data) => {
  data.sections.forEach((section) => {
    const filtered = section.blocks
      .slice()
      .filter(
        (block) =>
          !(
            block.type === blockTypes.media ||
            block.type === blockTypes.question
          )
      );
    section.blocks = [...filtered];
  });
  return data;
};

export const stripAdditionalPropertiesFromData = (data) => {
  let result = stripIdsFromData(data);
  result = stripIndicesFromData(result);
  return result;
};

export const stripEmptyAnswersFromMultipleAnswerQuestions = (data) => {
  const copy = JSON.parse(JSON.stringify(data));
  copy.sections.forEach((section) => {
    section.blocks.forEach((block) => {
      if (
        block.type === blockTypes.singleselect ||
        block.type === blockTypes.multiselect ||
        block.type === blockTypes.dropdown
      ) {
        block.items = block.items.filter((item) => item.value);
      }
    });
  });
  return copy;
};

export const reIndexSections = (sections, deep = false) => {
  sections.forEach((section, index) => {
    section.sectionIndex = index;
    section.sortOrder = index;
    if (deep) {
      reIndexBlocks(section.blocks, section.sectionIndex);
    }
  });
};

export const reIndexBlocks = (blocks, sectionIndex) => {
  blocks.forEach((block, index) => {
    block.sortOrder = index;
    block.blockIndex = index;
    block.sectionIndex = sectionIndex;
  });
};

export const escapeRegExp = (str = "") =>
  str.replace(/([.?*+^$[\]\\(){}| -])/g, "\\$1");

export const insertGlossaryToText = (text, sanitizedGlossary, glossaryMap) => {
  if (sanitizedGlossary) {
    const query = `(${[sanitizedGlossary]})`;
    const regex = new RegExp(query, "i");
    const parts = text.split(regex);

    const result = parts.map((part, index) => {
      if (regex.test(part)) {
        const explanation =
          glossaryMap[part] || glossaryMap[part.toLowerCase()];
        return (
          <span key={part + index} className="tooltip" title={explanation}>
            {part}
          </span>
        );
      } else {
        return part;
      }
    });

    return result;
  }
  return text;
};

export const insertGlossaryToBody = (text, sanitizedGlossary, glossaryMap) => {
  if (sanitizedGlossary) {
    const query = `(${[sanitizedGlossary]})`;
    const regex = new RegExp(query, "i");
    const parts = text.split(regex);

    const result = parts.map((part) => {
      if (regex.test(part)) {
        const explanation =
          glossaryMap[part] || glossaryMap[part.toLowerCase()];
        return `<span class="tooltip" title="${explanation}">${part}</span>`;
      } else {
        return part;
      }
    });

    return result.join("");
  }
  return text;
};

export const addGlossaryToData = (form, glossary) => {
  const sanitizedGlossary = glossary
    .map(({ term }) => escapeRegExp(term))
    .join("|");

  const glossaryMap = glossary.reduce(
    (result, current) => ({
      ...result,
      [current.term]: current.explanation,
      [current.term.toLowerCase()]: current.explanation,
    }),
    {}
  );

  return {
    ...form,
    sections: form.sections.map((section) => ({
      ...section,
      titleWithExplanations: insertGlossaryToText(
        section.title,
        sanitizedGlossary,
        glossaryMap
      ),
      bodyWithExplanations: insertGlossaryToBody(
        section.body,
        sanitizedGlossary,
        glossaryMap
      ),
      blocks: section.blocks.map((block) => ({
        ...block,
        titleWithExplanations: insertGlossaryToText(
          block.title,
          sanitizedGlossary,
          glossaryMap
        ),
        bodyWithExplanations: insertGlossaryToBody(
          block.body,
          sanitizedGlossary,
          glossaryMap
        ),
        items: (block.items || []).map((item) => ({
          ...item,
          valueWithExplanations: item.value
            ? insertGlossaryToText(item.value, sanitizedGlossary, glossaryMap)
            : item.value,
        })),
      })),
    })),
  };
};

export const stripGlossaryFromData = (data) => {
  const newData = {
    ...data,
    sections: data.sections.map((section) => {
      const { titleWithExplanations, bodyWithExplanations, ...rest } = section;
      return {
        ...rest,
        blocks: section.blocks.map((block) => {
          const {
            titleWithExplanations,
            bodyWithExplanations,
            ...rest
          } = block;
          return {
            ...rest,
            items:
              block.items &&
              block.items.map((item) => {
                const { valueWithExplanations, ...rest } = item;
                return rest;
              }),
          };
        }),
      };
    }),
  };
  return newData;
};

export const addFormUris = async (form) => {
  const mediaTypes = [
    blockTypes.video,
    blockTypes.audio,
    blockTypes.pdf,
    blockTypes.image,
  ];
  for (
    var sectionIterator = 0;
    sectionIterator < form.sections.length;
    sectionIterator++
  ) {
    const section = form.sections[sectionIterator];
    for (
      var blocksIterator = 0;
      blocksIterator < section.blocks.length;
      blocksIterator++
    ) {
      const block = section.blocks[blocksIterator];
      if (mediaTypes.includes(block.type)) {
        for (var i = 0; i < block.items.length; i++) {
          const sourceResponse = await StorageUtil.download(
            block.items[i].fileId
          );
          const response = await sourceResponse.json();
          block.items[i].source = response.url;
        }
      }
    }
  }
  return form;
};

/* Form styler remap TO "ICFStyleSheet" */

export const mapLocalStyleFormatToICFStyleSheet = ({ palette, typography }) => {
  const { h4, h6, subtitle1, body1, button } = typography;
  const { primary } = palette;

  const mapStyle = (
    { fontFamily, fontWeight, fontStyle, textDecoration },
    shade
  ) => {
    return {
      color: shade,
      fontFamily,
      fontWeight,
      italic: !!fontStyle,
      underlined: !!textDecoration,
    };
  };

  return {
    themeColor: primary.main,
    formHeading: mapStyle(h4, primary.contrastText),
    pageHeading: mapStyle(h6, primary.contrastText),
    blockHeading: mapStyle(subtitle1, primary.contrastText),
    bodyText: mapStyle(body1, primary.contrastText),
    button: mapStyle(button, primary.contrastText),
  };
};

/* Form styler remap FROM "ICFStyleSheet" */

export const mapICFStyleSheetToLocalStyle = (icfStyle) => {
  const resolveStyle = (variantStyles) => {
    if (!variantStyles) return;
    const { fontFamily, fontWeight, italic, underlined } = variantStyles;
    const styles = { fontFamily: fontFamily, fontWeight: fontWeight };
    if (italic) styles.fontStyle = "italic";
    if (underlined) styles.textDecoration = "underline";
    return styles;
  };

  return icfStyle
    ? {
        palette: { primary: { main: icfStyle.themeColor } },
        typography: {
          h4: { ...resolveStyle(icfStyle.formHeading) },
          h6: { ...resolveStyle(icfStyle.pageHeading) },
          subtitle1: { ...resolveStyle(icfStyle.blockHeading) },
          body1: { ...resolveStyle(icfStyle.bodyText) },
          caption: { ...resolveStyle(icfStyle.bodyText) },
          button: { ...resolveStyle(icfStyle.button) },
        },
      }
    : {};
};
