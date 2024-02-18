import _ from 'lodash';

const makeIndent = (count) => `${'  '.repeat(count * 2)}`;

const formatValue = (value, depth = 0) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedValue = keys.map((key) => `    ${makeIndent(depth)}${key}: ${formatValue(value[key], depth + 1)}`);

    return `{\n${formattedValue.join('\n')}\n${makeIndent(depth)}}`;
  }

  return value;
};

const getStylishDiff = (value, depth = 0) => {
  const lines = value.map((item) => {
    if (item.type === 'nested') {
      return `    ${makeIndent(depth)}${item.key}: ${getStylishDiff(item.children, depth + 1)}`;
    }

    if (item.type === 'added') {
      return `  ${makeIndent(depth)}+ ${item.key}: ${formatValue(item.value, depth + 1)}`;
    }

    if (item.type === 'removed') {
      return `  ${makeIndent(depth)}- ${item.key}: ${formatValue(item.value, depth + 1)}`;
    }

    if (item.type === 'updated') {
      return [
        `  ${makeIndent(depth)}- ${item.key}: ${formatValue(item.value1, depth + 1)}`,
        `  ${makeIndent(depth)}+ ${item.key}: ${formatValue(item.value2, depth + 1)}`,
      ].join('\n');
    }

    if (item.type === 'unchanged') {
      return `    ${makeIndent(depth)}${item.key}: ${formatValue(item.value, depth + 1)}`;
    }

    return null;
  });

  return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`;
};

export default getStylishDiff;
