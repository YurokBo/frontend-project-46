import { getFileParser } from './parser.js';
import { getFile, getFileExt } from './helpers.js';

const genDiff = (file1, file2) => {
  const extFile1 = getFileExt(getFile(file1));
  const extFile2 = getFileExt(getFile(file2));
  const parserFile1 = getFileParser(extFile1);
  const parserFile2 = getFileParser(extFile2);
  const contentFile1 = parserFile1(getFile(file1));
  const contentFile2 = parserFile2(getFile(file2));
  const keys = Object.keys({ ...contentFile1, ...contentFile2 }).sort();

  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(contentFile1, key)) {
      return [...acc, `  + ${key}: ${contentFile2[key]}`];
    }
    if (!Object.hasOwn(contentFile2, key)) {
      return [...acc, `  - ${key}: ${contentFile1[key]}`];
    }
    if (contentFile1[key] !== contentFile2[key]) {
      return [...acc, `  - ${key}: ${contentFile1[key]}\n  + ${key}: ${contentFile2[key]}`];
    }

    return [...acc, `    ${key}: ${contentFile1[key]}`];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
