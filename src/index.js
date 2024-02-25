import path from 'node:path';
import { readFileSync } from 'node:fs';
import getFileData from './parsers.js';
import getFormattedFile from './formatters/index.js';
import createDiffTree from './createDiffTree.js';

const buildFullPath = (file) => path.resolve(process.cwd(), file);

const readFile = (file) => {
  const filePath = buildFullPath(file);
  return readFileSync(filePath, 'utf8');
};

const getExtension = (file) => path.extname(file).slice(1);

const getContent = (file) => {
  const extension = getExtension(file);

  return getFileData(readFile(file), extension);
};

const genDiff = (file1, file2, format = 'stylish') => {
  const contentFile1 = getContent(file1);
  const contentFile2 = getContent(file2);
  const diffTree = createDiffTree(contentFile1, contentFile2);

  return getFormattedFile(diffTree, format);
};

export default genDiff;
