import _ from 'lodash';

const createDiffTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key, type: 'nested', children: createDiffTree(file1[key], file2[key]),
      };
    }

    if (!_.has(file1, key)) {
      return {
        key, type: 'added', value: file2[key],
      };
    }

    if (!_.has(file2, key)) {
      return {
        key, type: 'removed', value: file1[key],
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

export default createDiffTree;
