import _ from 'lodash';

const createDiffTree = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isObject(content1[key]) && _.isObject(content2[key])) {
      return {
        key, type: 'nested', children: createDiffTree(content1[key], content2[key]),
      };
    }

    if (!_.has(content1, key)) {
      return {
        key, type: 'added', value: content2[key],
      };
    }

    if (!_.has(content2, key)) {
      return {
        key, type: 'removed', value: content1[key],
      };
    }

    if (!_.isEqual(content1[key], content2[key])) {
      return {
        key, type: 'updated', value1: content1[key], value2: content2[key],
      };
    }

    return {
      key, type: 'unchanged', value: content1[key],
    };
  });
};

export default createDiffTree;
