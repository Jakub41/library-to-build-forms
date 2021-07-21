import React, { useEffect, useState } from 'react';

const escapeRegExp = (str = '') => str.replace(/([.?*+^$[\]\\(){}| -])/g, '\\$1');

const style = {
  backgroundColor: '#0C91E926',
  cursor: 'not-allowed',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
};

function prepareText({ initialText, items }) {
  const sanitizedItems = Object.values(items)
    .map(({ term }) => escapeRegExp(term))
    .join('|');
  const query = `(${[sanitizedItems]})`;
  const regex = new RegExp(query, 'i');
  const parts = initialText.split(regex);

  const result = parts.map((part, index) => {
    return <React.Fragment key={index}>{regex.test(part) ? <mark style={style}>{part}</mark> : part}</React.Fragment>;
  });

  return result;
}

function extractTitleBody({ title, body }) {
  return [title, body];
}

function useHighlight(data, glossary, onChange) {
  const initialItems = glossary || [];
  const initialText = data.sections
    .reduce((acc, current) => {
      return acc.concat(...extractTitleBody(current), ...current.blocks.map((block) => extractTitleBody(block)));
    }, [])
    .join('\r\n');

  const [state, setState] = useState({
    text: initialText,
    items: initialItems,
  });

  useEffect(() => {
    const items = [...state.items];
    const result = Boolean(items.length) ? prepareText({ initialText, items }) : initialText;
    setState({ ...state, text: result, items });
  }, []);

  const isNotUnique = (query) => {
    return state.items.some((entry) => entry.term.toLowerCase() === query.trim().toLowerCase());
  };

  const highLightQuery = (query) => {
    if (query && !isNotUnique(query)) {
      const items = [...state.items, { term: query.trim(), explanation: '' }];

      const result = Boolean(items.length) ? prepareText({ initialText, items }) : initialText;
      onChange(items);
      setState({ ...state, items, text: result });
    }
  };

  const onHandleRemoveGlossary = (index) => {
    const items = [...state.items];

    items.splice(index, 1);

    const result = Boolean(items.length) ? prepareText({ initialText, items }) : initialText;
    onChange(items);
    setState({ ...state, items, text: result });
  };

  const onAddNewGlossaryTerm = () => {
    const newItem = {
      term: `New term`,
      explanation: '',
    };

    const items = [...state.items, newItem];
    const result = prepareText({ initialText, items });
    onChange(items);
    setState({ ...state, items, text: result });
  };

  const onHandleGlossaryChange = (index, { term, explanation }) => {
    let items = [...state.items];
    if (!isNotUnique(term)) {
      items[index] = { term, explanation };
      const result = Boolean(items.length) ? prepareText({ initialText, items }) : initialText;
      onChange(items);
      setState({ ...state, items, text: result });
    } else {
      items[index].explanation = explanation;
      onChange(items);
      setState({ ...state, items });
    }
  };

  return {
    highLightQuery,
    onHandleRemoveGlossary,
    onAddNewGlossaryTerm,
    onHandleGlossaryChange,
    text: state.text,
    items: state.items,
  };
}

export default useHighlight;
