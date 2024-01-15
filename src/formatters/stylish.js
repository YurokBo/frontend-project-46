import _ from 'lodash';

const stylish = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 }).sort();

  const lines = keys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return {
        key, type: 'added', value: file2[key],
      };
    }
    if (!Object.hasOwn(file2, key)) {
      return {
        key, type: 'deleted', value: file1[key],
      };
    }

    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key, type: 'nested', children: stylish(file1[key], file2[key]),
      };
    }

    if (!_.isObject(file1[key]) && !_.isObject(file2[key]) && file1[key] !== file2[key]) {
      return {
        key, type: 'updated', value1: file1[key], value2: file2[key],
      };
    }

    return {
      key, type: 'unchanged', value: file1[key],
    };
  });

  return lines;
};

export default stylish;
