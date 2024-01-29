import yaml from 'js-yaml';

const getFileParser = (ext) => {
  const ymlFormatExtensions = ['.yaml', '.yml'];

  if (ymlFormatExtensions.includes(ext)) {
    return yaml.load;
  }

  return JSON.parse;
};

export default getFileParser;
