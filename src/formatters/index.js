import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatter) => {
  if (formatter === 'plain') {
    return plain;
  }

  if (formatter === 'json') {
    return json;
  }

  return stylish;
};

export default getFormatter;
