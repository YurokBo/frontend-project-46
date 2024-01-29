import yaml from 'js-yaml';

const getFileParser = (ext) => {
  const ymlFormatExtensions = ['.yaml', '.yml'];

  if (ext === '.json') {
    return JSON.parse;
  }

  if (ymlFormatExtensions.includes(ext)) {
    return yaml.load;
  }

  throw new Error('Unknown extension');
};

export default getFileParser;
