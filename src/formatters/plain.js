import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPlainDiff = (value) => {
  const iter = (currentValue, currentKey = '') => {
    const lines = currentValue.map((item) => {
      const path = `${currentKey}${item.key}`;

      switch (item.type) {
        case 'nested':
          return iter(item.children, `${path}.`);
        case 'added':
          return `Property '${path}' was ${item.type} with value: ${stringify(item.value)}`;
        case 'removed':
          return `Property '${path}' was ${item.type}`;
        case 'updated':
          return `Property '${path}' was ${item.type}. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'unchanged':
          return null;
        default:
          return null;
      }
    });

    return lines.filter((line) => line).join('\n');
  };
  return iter(value);
};

export default getPlainDiff;
