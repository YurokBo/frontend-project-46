import path from 'node:path';
import { readFileSync } from 'node:fs';
import getFileParser from './parsers.js';
import getFormatter from './formatters/index.js';
import createDiffTree from './createDiffTree.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);

const getFile = (file) => {
  const filePath = getFilePath(file);
  return readFileSync(filePath, 'utf8');
};

const getFileExt = (file) => path.extname(file);

const getContent = (file) => {
  const ext = getFileExt(file);
  const parser = getFileParser(ext);

  return parser(getFile(file));
};

const genDiff = (file1, file2, format = 'stylish') => {
  const contentFile1 = getContent(file1);
  const contentFile2 = getContent(file2);
  const diffTree = createDiffTree(contentFile1, contentFile2);
  const formatter = getFormatter(format);

  return formatter(diffTree);
};

export default genDiff;
