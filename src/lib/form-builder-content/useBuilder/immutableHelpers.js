export const deepFreeze = (object) => {
  const propNames = Object.getOwnPropertyNames(object);

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};

export const insertItemAt = (xs, x, index) => [
  ...xs.slice(0, index),
  x,
  ...xs.slice(index),
];

export const updateObjectInArray = (xs, x, index) =>
  xs.map((item, i) => {
    if (i !== index) {
      return item;
    }

    return {
      ...item,
      ...x,
    };
  });

export const removeItem = (xs, index) => {
  return [...xs.slice(0, index), ...xs.slice(index + 1)];
};
