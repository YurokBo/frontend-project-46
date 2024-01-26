import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatterName) => {
  if (formatterName === 'stylish') {
    return stylish;
  }

  if (formatterName === 'plain') {
    return plain;
  }

  throw new Error('Unknown formatter');
};

export default getFormatter;
