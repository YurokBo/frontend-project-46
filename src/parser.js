import yaml from 'js-yaml';

// eslint-disable-next-line import/prefer-default-export
export const getFileParser = (ext) => (ext === 'json' ? JSON.parse : yaml.load);
