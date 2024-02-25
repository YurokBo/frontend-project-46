import createStylishDiff from './stylish.js';
import createPlainDiff from './plain.js';

const formatters = {
  json: JSON.stringify,
  stylish: createStylishDiff,
  plain: createPlainDiff,
};

const getFormattedFile = (data, formatter) => {
  if (!Object.hasOwn(formatters, formatter)) {
    throw new Error(`Unknown formatter ${formatter}`);
  }

  return formatters[formatter](data);
};

export default getFormattedFile;
