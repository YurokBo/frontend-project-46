import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

export const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);

export const getFile = (file) => {
  const filePath = getFilePath(file);
  return readFileSync(filePath, 'utf8');
};

export const getFileExt = (file) => path.extname(file);

export const createDiffTree = (filepath1, filepath2) => {
  const keys1 = Object.keys(filepath1);
  const keys2 = Object.keys(filepath2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = [...keys].sort();

  return sortedKeys.map((key) => {
    if (_.isObject(filepath1[key]) && _.isObject(filepath2[key])) {
      return {
        key, type: 'nested', children: createDiffTree(filepath1[key], filepath2[key]),
      };
    }

    if (!_.has(filepath1, key)) {
      return {
        key, type: 'added', value: filepath2[key],
      };
    }

    if (!_.has(filepath2, key)) {
      return {
        key, type: 'removed', value: filepath1[key],
      };
    }

    if (!_.isEqual(filepath1[key], filepath2[key])) {
      return {
        key, type: 'updated', value1: filepath1[key], value2: filepath2[key],
      };
    }

    return {
      key, type: 'unchanged', value: filepath1[key],
    };
  });
};
