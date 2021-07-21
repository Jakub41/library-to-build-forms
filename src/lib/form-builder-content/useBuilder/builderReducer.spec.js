import { deepFreeze } from "./immutableHelpers";
import { actionCreators, builderReducer } from "./useBuilder";

test("returns same state if nothing changes", () => {
  const state = deepFreeze({ sections: [] });

  const result = builderReducer(state, { type: "foobar" });

  expect(result).toBe(state);
});

test("add section on top", () => {
  const state = deepFreeze({ sections: [] });
  const action = actionCreators.addSectionOnTop();

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      { blocks: [], body: "", sectionIndex: 0, sortOrder: 0, title: "" },
    ],
  });
});

test("add section after section", () => {
  const state = deepFreeze({
    sections: [
      { blocks: [], body: "asd", sectionIndex: 0, sortOrder: 0, title: "" },
      { blocks: [], body: "asd", sectionIndex: 1, sortOrder: 1, title: "" },
    ],
  });
  const action = actionCreators.addSectionAfterSection({ sectionIndex: 0 });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      { blocks: [], body: "asd", sectionIndex: 0, sortOrder: 0, title: "" },
      { title: "", body: "", blocks: [], sectionIndex: 1, sortOrder: 1 },
      { blocks: [], body: "asd", sectionIndex: 2, sortOrder: 2, title: "" },
    ],
  });
});

test("add page break", () => {
  const state = deepFreeze({
    sections: [
      {
        title: "",
        body: "asd",
        blocks: [
          { title: "qwe", body: "", items: [], sectionIndex: 0, blockIndex: 0 },
          { title: "asd", body: "", items: [], sectionIndex: 0, blockIndex: 1 },
        ],
        sectionIndex: 0,
        sortOrder: 0,
      },
    ],
  });
  const action = actionCreators.addPageBreak({ sectionIndex: 0 }, 0);

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      {
        blocks: [
          {
            title: "qwe",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        body: "asd",
        sectionIndex: 0,
        sortOrder: 0,
        title: "",
      },
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            sectionIndex: 1,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        title: "",
        body: "",
        sectionIndex: 1,
        sortOrder: 1,
      },
    ],
  });
});

test("update section", () => {
  const state = deepFreeze({
    sections: [
      {
        title: "",
        body: "asd",
        blocks: [
          { title: "qwe", body: "", items: [], sectionIndex: 0, blockIndex: 0 },
          { title: "asd", body: "", items: [], sectionIndex: 0, blockIndex: 1 },
        ],
        sectionIndex: 0,
        sortOrder: 0,
      },
    ],
  });
  const action = actionCreators.updateSection({
    blocks: [
      {
        title: "asd",
        body: "",
        items: [],
        sectionIndex: 0,
        blockIndex: 0,
        sortOrder: 0,
      },
    ],
    title: "",
    body: "zxc",
    sectionIndex: 0,
    sortOrder: 0,
  });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        body: "zxc",
        sectionIndex: 0,
        sortOrder: 0,
        title: "",
      },
    ],
  });
});

test("delete page break", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "qwe",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        body: "asd",
        sectionIndex: 0,
        sortOrder: 0,
        title: "",
      },
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            sectionIndex: 1,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        title: "",
        body: "",
        sectionIndex: 1,
        sortOrder: 1,
      },
    ],
  });
  const action = actionCreators.deletePageBreak({
    blocks: [
      {
        title: "asd",
        body: "",
        items: [],
        sectionIndex: 1,
        blockIndex: 0,
        sortOrder: 0,
      },
    ],
    title: "",
    body: "",
    sectionIndex: 1,
    sortOrder: 1,
  });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      {
        title: "",
        body: "asd",
        blocks: [
          {
            title: "qwe",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
          {
            title: "asd",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 1,
            sortOrder: 1,
          },
        ],
        sectionIndex: 0,
        sortOrder: 0,
      },
    ],
  });
});

test("delete section", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        title: "",
        body: "",
        sectionIndex: 1,
        sortOrder: 1,
      },
    ],
  });
  const action = actionCreators.deleteSection({
    sectionIndex: 0,
  });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [],
  });
});

test("add block", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [],
        body: "",
        sectionIndex: 0,
        sortOrder: 0,
        title: "",
      },
    ],
  });
  const action = actionCreators.addBlock(0, "yesno");

  const result = builderReducer(state, action);

  expect(result.sections[0].blocks[0].items).toEqual([]);
  expect(result.sections[0].blocks[0].options).toEqual({
    trueValue: "Yes",
    falseValue: "No",
    trueValueIsMandatory: false,
    falseValueIsMandatory: false,
  });
  expect(result.sections[0].blocks[0].type).toEqual("yesno");
});

test("update block", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
          },
        ],
        title: "",
        body: "",
      },
    ],
  });
  const action = actionCreators.updateBlock({
    sectionIndex: 0,
    title: "new title",
    blockIndex: 0,
  });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      {
        blocks: [{ sectionIndex: 0, title: "new title", blockIndex: 0 }],
        title: "",
        body: "",
      },
    ],
  });
});

test.skip("duplicate block", () => {});

test("delete block", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
          },
          {
            title: "xzc",
            body: "",
            items: [],
          },
        ],
        title: "",
        body: "",
      },
    ],
  });
  const action = actionCreators.deleteBlock({
    sectionIndex: 0,
    blockIndex: 0,
  });

  const result = builderReducer(state, action);

  expect(result).toEqual({
    sections: [
      {
        blocks: [
          {
            title: "xzc",
            body: "",
            items: [],
            sectionIndex: 0,
            blockIndex: 0,
            sortOrder: 0,
          },
        ],
        title: "",
        body: "",
      },
    ],
  });
});

test("block validation - update signature block to be invalid", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            type: "signature",
          },
        ],
        title: "",
        body: "",
      },
    ],
  });
  const action = actionCreators.updateBlock({
    sectionIndex: 0,
    type: "signature",
    blockIndex: 0,
    options: { reason: "" },
  });

  const result = builderReducer(state, action);

  expect(result.sections[0].blocks[0].meta).toEqual({ valid: false });
  expect(result.sections[0].blocks[0].options).toEqual({ reason: "" });
});

test("block validation - update invalid signature block to be valid", () => {
  const state = deepFreeze({
    sections: [
      {
        blocks: [
          {
            title: "asd",
            body: "",
            items: [],
            type: "signature",
          },
        ],
        title: "",
        body: "",
      },
    ],
  });
  const action = actionCreators.updateBlock({
    sectionIndex: 0,
    type: "signature",
    blockIndex: 0,
    options: { reason: "asd" },
  });

  const result = builderReducer(state, action);

  expect(result.sections[0].blocks[0].meta).toEqual({ valid: true });
  expect(result.sections[0].blocks[0].options).toEqual({ reason: "asd" });
});
