import { createDiffTree, getFile, getFileExt } from './helpers.js';
import getFileParser from './parsers.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const extFile1 = getFileExt(getFile(filepath1));
  const extFile2 = getFileExt(getFile(filepath2));
  const parserFile1 = getFileParser(extFile1);
  const parserFile2 = getFileParser(extFile2);
  const contentFile1 = parserFile1(getFile(filepath1));
  const contentFile2 = parserFile2(getFile(filepath2));
  const diffTree = createDiffTree(contentFile1, contentFile2);
  const formatter = getFormatter(format);

  return formatter(diffTree);
};

export default genDiff;
