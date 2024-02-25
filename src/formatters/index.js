import getStylishDiff from './stylish.js';
import getPlainDiff from './plain.js';

const formatters = {
  json: JSON.stringify,
  stylish: getStylishDiff,
  plain: getPlainDiff,
};

const getFormattedFile = (data, formatter) => {
  if (!Object.hasOwn(formatters, formatter)) {
    throw new Error(`Unknown formatter ${formatter}`);
  }

  return formatters[formatter](data);
};

export default getFormattedFile;
