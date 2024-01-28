import _ from 'lodash';

const formatValue = (value, depth = 0, replacer = ' ') => {
  if (_.isObject(value)) {
    const currentIndent = replacer.repeat((depth * 2) + 2);
    const bracketIndent = replacer.repeat((depth * 2));
    const entries = Object.entries(value);
    const formattedValue = entries.map(([key, val]) => `${currentIndent}"${key}": ${formatValue(val, depth + 1)}`);

    return `{\n${formattedValue.join('\n')}\n${bracketIndent}},`;
  }

  return typeof value === 'string' ? `"${value}",` : `${value},`;
};

const json = (value, replacer = ' ') => {
  const iter = (currentValue, depth = 0) => currentValue.map((item) => {
    const entries = Object.entries(item);
    const bracketIndent = replacer.repeat((depth * 2));

    const lines = entries.map(([key, val]) => {
      const currentIndent = replacer.repeat((depth * 2) + 2);

      if (key === 'children') {
        return `${currentIndent}"${key}": [\n${iter(val, depth + 2).join('\n')}\n${currentIndent}],`;
      }

      return `${currentIndent}"${key}": ${formatValue(val, depth + 1)}`;
    });

    return `${bracketIndent}{\n${lines.join('\n')}\n${bracketIndent}},`;
  });

  return `[\n${iter(value, 1).join('\n')}\n]`;
};

export default json;
