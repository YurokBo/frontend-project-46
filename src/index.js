import stylish from './formatters/stylish.js';
import { getFile, getFileExt } from './helpers.js';
import { getFileParser } from './parsers.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const extFile1 = getFileExt(getFile(file1));
  const extFile2 = getFileExt(getFile(file2));
  const parserFile1 = getFileParser(extFile1);
  const parserFile2 = getFileParser(extFile2);
  const contentFile1 = parserFile1(getFile(file1));
  const contentFile2 = parserFile2(getFile(file2));

  if (format === 'stylish') {
    return stylish(contentFile1, contentFile2);
  }

  return 'No such formatters';
};

export default genDiff;
