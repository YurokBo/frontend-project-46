import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFilePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

export const getFile = (file) => {
  const filePath = getFilePath(file);

  return readFileSync(filePath, 'utf8');
};

export const getFileExt = (file) => path.extname(file);

export const createAst = (file1, file2) => {
  const keys1 = Object.keys(file1 || {});
  const keys2 = Object.keys(file2 || {});
  const keys = _.union(keys1, keys2).sort();

  return keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key, type: 'nested', children: createAst(file1[key], file2[key]),
      };
    }

    if (!_.has(file1, key)) {
      return {
        key, type: 'added', value: file2[key],
      };
    }

    if (!_.has(file2, key)) {
      return {
        key, type: 'deleted', value: file1[key],
      };
    }

    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key, type: 'updated', value1: file1[key], value2: file2[key],
      };
    }

    return {
      key, type: 'unchanged', value: file1[key],
    };
  });
};
