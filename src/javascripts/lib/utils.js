/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

// polyfills for partial and pipe operators paradigm

export const partial = (fn, ...args) => fn.bind(null, ...args);
const pipeRec = (f, g) => (...args) => g(f(...args));
export const pipe = (...fns) => fns.reduce(pipeRec);

export const flattenMessages = (nestedMessages, prefix = '') =>
  Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});

export const convertKeyCode = code => {
  const decoded = atob(code);
  let i;
  const il = decoded.length;
  const array = new Uint8Array(il);
  for (i = 0; i < il; ++i) {
    array[il - 1 - i] = decoded.charCodeAt(i);
  }
  const uint = new Uint32Array(array.buffer)[0];
  return uint;
};

export const findElementArrayJson = (array, propName, propValue) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propName] === propValue) {
      return array[i];
    }
  }

  // will return undefined if not found; you could return a default instead
};
