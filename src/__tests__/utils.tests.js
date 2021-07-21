import { generateUUID } from "../lib/utils/index";
import matchMimeTypesRegex from "../lib/utils/matchMimeTypesRegex";
import {
  addGlossaryToData,
  escapeRegExp,
  mapApiFormatToLocal,
  mapLocalFormatToApi,
  stripEmptyAnswersFromMultipleAnswerQuestions,
  stripGlossaryFromData,
} from "../lib/utils/utils";

describe("Utils test", () => {
  const uuidPattern = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

  const mockData = {
    title: "Questionnaire heading. This one is long.",
    body:
      "This is the body text of the questionnaire heading. It can be long, making this page scrolling. That's ok, the CTA can sit below the fold if necessary.",
    sections: [
      {
        key: "how-the-study-will-be-performed",
        title: "Page heading 2",
        body: "This is the page with media",
        validation: "[[ q1 && q2=='female' && question-182==watched]]",
        sortOrder: 2,
        blocks: [
          {
            title: "Checkbox question heading",
            body:
              "Question body text. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat?",
            sortOrder: 0,
            items: [
              {
                key: "Lorem_ipsum_dolor",
                value: "Lorem ipsum dolor",
                isMandatory: false,
              },
              {
                key: "is_mandatory_key",
                value: "",
                isMandatory: true,
              },
              {
                key: "item-3",
                value: "item 3",
                isMandatory: false,
              },
            ],
            type: "multiselect",
          },
        ],
      },
    ],
  };

  test("mapLocalFormatToApi", () => {
    const data = {
      sections: [
        { blocks: [{ meta: {}, id: "foo" }] },
        { blocks: [{ meta: {}, id: "bar" }] },
      ],
    };

    const result = mapLocalFormatToApi(data);

    expect(result).toEqual({
      pages: [{ blocks: [{ id: "foo" }] }, { blocks: [{ id: "bar" }] }],
    });
  });

  test("generate UUID", () => {
    const uuid = generateUUID();

    expect(uuid).toMatch(uuidPattern);
  });

  test("escapeRegExp sanitizes regex special characters)", () => {
    const sanitizedText = escapeRegExp(".?*+^$[](){}| -/\\");
    expect(sanitizedText).toEqual(
      `\\.\\?\\*\\+\\^\\$\\[\\]\\(\\)\\{\\}\\|\\ \\-/\\\\`
    );
  });

  test("matchMimeTypesRegex splits mime types and extension of binary", () => {
    expect(matchMimeTypesRegex("image/gif")).toEqual({
      ext: "gif",
      type: "image",
    });
    expect(matchMimeTypesRegex("audio/mpeg")).toEqual({
      ext: "mpeg",
      type: "audio",
    });
    expect(matchMimeTypesRegex("video/mpeg")).toEqual({
      ext: "mpeg",
      type: "video",
    });
  });

  test("stripEmptyAnswersFromMultipleAnswerQuestions filters items without value", () => {
    const result = stripEmptyAnswersFromMultipleAnswerQuestions(mockData);
    expect(result.sections[0].blocks[0].items).toHaveLength(2);
  });

  test("addGlossaryToData assigns properties to form that resolve using glossary", () => {
    const result = addGlossaryToData(mockData, [
      { term: "Emulgel", explanation: "explanationEmulgel" },
    ]);
    expect(result.sections[0].titleWithExplanations).toBeDefined();
    expect(result.sections[0].bodyWithExplanations).toBeDefined();
    expect(result.sections[0].blocks[0].bodyWithExplanations).toBeDefined();
    expect(result.sections[0].blocks[0].titleWithExplanations).toBeDefined();
    expect(
      result.sections[0].blocks[0].items[0].valueWithExplanations
    ).toBeDefined();
  });

  test("stripGlossaryFromData cleans up properties related with the glossary", () => {
    const result = stripGlossaryFromData(mockData);

    expect(result.sections[0].titleWithExplanations).toBeUndefined();
    expect(result.sections[0].bodyWithExplanations).toBeUndefined();
    expect(result.sections[0].blocks[0].bodyWithExplanations).toBeUndefined();
    expect(result.sections[0].blocks[0].titleWithExplanations).toBeUndefined();
    expect(
      result.sections[0].blocks[0].items[0].valueWithExplanations
    ).toBeUndefined();
  });

  test("mapApiFormatToLocal maps pages to sections", () => {
    const form = {
      pages: [],
    };

    const result = mapApiFormatToLocal(form);

    expect(result.sections).toBeDefined();
    expect(result.pages).not.toBeDefined();
  });

  test("mapLocalFormatToApi maps pages to sections", () => {
    const form = {
      sections: [],
    };

    const result = mapLocalFormatToApi(form);

    expect(result.pages).toBeDefined();
    expect(result.sections).not.toBeDefined();
  });
});
