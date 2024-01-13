import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

// eslint-disable-next-line import/prefer-default-export
export const parseFile = (file) => {
  const extname = path.extname(file);

  if (extname === 'json') {
    return JSON.parse(file);
  }

  return yaml.load(file);
};
