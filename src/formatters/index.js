import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatter) => {
  if (formatter === 'stylish') {
    return stylish;
  }

  if (formatter === 'plain') {
    return plain;
  }

  if (formatter === 'json') {
    return json;
  }

  throw new Error('Unknown formatter');
};

export default getFormatter;
