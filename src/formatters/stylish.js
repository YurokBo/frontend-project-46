import _ from 'lodash';

const makeIndent = (count) => `${'  '.repeat(count * 2)}`;

const stringify = (value, depth = 0) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedValue = keys.map((key) => `    ${makeIndent(depth)}${key}: ${stringify(value[key], depth + 1)}`);

    return `{\n${formattedValue.join('\n')}\n${makeIndent(depth)}}`;
  }

  return value;
};

const getStylishDiff = (value, depth = 0) => {
  const lines = value.map((item) => {
    switch (item.type) {
      case 'nested':
        return `    ${makeIndent(depth)}${item.key}: ${getStylishDiff(item.children, depth + 1)}`;
      case 'added':
        return `  ${makeIndent(depth)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
      case 'removed':
        return `  ${makeIndent(depth)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
      case 'updated':
        return [
          `  ${makeIndent(depth)}- ${item.key}: ${stringify(item.value1, depth + 1)}`,
          `  ${makeIndent(depth)}+ ${item.key}: ${stringify(item.value2, depth + 1)}`,
        ].join('\n');
      case 'unchanged':
        return `    ${makeIndent(depth)}${item.key}: ${stringify(item.value, depth + 1)}`;
      default:
        return null;
    }
  });

  return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`;
};

export default getStylishDiff;
