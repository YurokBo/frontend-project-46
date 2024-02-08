import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPlainDiff = (value) => {
  const iter = (currentValue, currentKey = '') => {
    const lines = currentValue.map((item) => {
      const path = `${currentKey}${item.key}`;

      if (item.type === 'nested') {
        return iter(item.children, `${path}.`);
      }

      if (item.type === 'added') {
        return `Property '${path}' was ${item.type} with value: ${formatValue(item.value)}`;
      }

      if (item.type === 'removed') {
        return `Property '${path}' was ${item.type}`;
      }

      if (item.type === 'updated') {
        return `Property '${path}' was ${item.type}. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
      }

      if (item.type === 'unchanged') {
        return null;
      }

      return null;
    });

    return lines.filter((line) => line).join('\n');
  };
  return iter(value);
};

export default getPlainDiff;
