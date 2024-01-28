import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatterName) => {
  if (formatterName === 'stylish') {
    return stylish;
  }

  if (formatterName === 'plain') {
    return plain;
  }

  if (formatterName === 'json') {
    return json;
  }

  throw new Error('Unknown formatter');
};

export default getFormatter;
