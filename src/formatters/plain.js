import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (value) => {
  const iter = (currentValue, currentKey = '') => {
    const lines = currentValue.map((item) => {
      if (item.type === 'nested') {
        return iter(item.children, `${currentKey}${item.key}.`);
      }

      if (item.type === 'added') {
        return `Property '${currentKey}${item.key}' was ${item.type} with value: ${formatValue(item.value)}`;
      }

      if (item.type === 'removed') {
        return `Property '${currentKey}${item.key}' was ${item.type}`;
      }

      if (item.type === 'updated') {
        return `Property '${currentKey}${item.key}' was ${item.type}. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
      }

      return '';
    });

    return lines.filter((line) => line.length).join('\n');
  };
  return iter(value);
};

export default plain;
