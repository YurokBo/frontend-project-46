import yaml from 'js-yaml';

const getFileParser = (ext) => {
  switch (ext) {
    case '.yaml':
    case '.yml':
      return yaml.load;

    case '.json':
      return JSON.parse;

    default:
      throw new Error('Invalid format');
  }
};

export default getFileParser;
