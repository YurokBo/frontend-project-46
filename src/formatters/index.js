import getStylishDiff from './stylish.js';
import getPlainDiff from './plain.js';

const getFormatter = (formatter) => {
  if (formatter === 'plain') {
    return getPlainDiff;
  }

  if (formatter === 'json') {
    return JSON.stringify;
  }

  return getStylishDiff;
};

export default getFormatter;
