// import { cwd } from 'node:process';
// import path from 'node:path';
import { readFileSync } from 'node:fs';
import { getPath } from './helpers.js';
import { parseFile } from './parser.js';

export const getFile = (file) => {
  const filePath = getPath(file);

  return readFileSync(filePath, 'utf8');
};

const genDiff = (file1, file2) => {
  const parsedFile1 = parseFile(getFile(file1));
  const parsedFile2 = parseFile(getFile(file2));
  const keys = Object.keys({ ...parsedFile1, ...parsedFile2 }).sort();

  const result = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (!Object.hasOwn(parsedFile1, key)) {
      result.push(`  + ${key}: ${parsedFile2[key]}`);
    } else if (!Object.hasOwn(parsedFile2, key)) {
      result.push(`  - ${key}: ${parsedFile1[key]}`);
    } else if (parsedFile1[key] !== parsedFile2[key]) {
      result.push(`  - ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}`);
    } else {
      result.push(`    ${key}: ${parsedFile1[key]}`);
    }
  }

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
