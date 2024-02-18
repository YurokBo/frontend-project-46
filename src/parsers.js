import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getFileData = (data, parser) => {
  if (!Object.hasOwn(parsers, parser)) {
    throw new Error('Unknown parser');
  }

  return parsers[parser](data);
};

export default getFileData;
