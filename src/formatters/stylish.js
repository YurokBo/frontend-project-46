import _ from 'lodash';

const formatValue = (data, depth = 0, replacer = ' ') => {
  if (_.isObject(data)) {
    const currentIndent = replacer.repeat(depth * 4);
    const bracketIndent = replacer.repeat((depth - 1) * 4);
    const keys = Object.keys(data);
    const formattedValue = keys.map((key) => `${currentIndent}${key}: ${formatValue(data[key], depth + 1)}`);

    return `{\n${formattedValue.join('\n')}\n${bracketIndent}}`;
  }

  return data;
};

const stylish = (value, replacer = ' ') => {
  const leftShiftTypes = ['added', 'removed', 'updated'];

  const iter = (currentValue, depth = 0) => {
    const bracketIndent = replacer.repeat((depth - 1) * 4);

    const lines = currentValue.map((item) => {
      const leftShift = leftShiftTypes.includes(item.type) ? 2 : 0;
      const currentIndent = replacer.repeat(depth * 4 - leftShift);

      if (item.type === 'nested') {
        return `${currentIndent}${item.key}: ${iter(item.children, depth + 1)}`;
      }

      if (item.type === 'added') {
        return `${currentIndent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`;
      }

      if (item.type === 'removed') {
        return `${currentIndent}- ${item.key}: ${formatValue(item.value, depth + 1)}`;
      }

      if (item.type === 'updated') {
        return [
          `${currentIndent}- ${item.key}: ${formatValue(item.value1, depth + 1)}`,
          `${currentIndent}+ ${item.key}: ${formatValue(item.value2, depth + 1)}`,
        ].join('\n');
      }

      return `${currentIndent}${item.key}: ${formatValue(item.value, depth + 1)}`;
    });

    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };

  return iter(value, 1);
};

export default stylish;
