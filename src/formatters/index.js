import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatter) => {
  if (formatter === 'plain') {
    return plain;
  }

  if (formatter === 'json') {
    return JSON.stringify;
  }

  return stylish;
};

export default getFormatter;
