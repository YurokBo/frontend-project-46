import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getFileData = (data, type) => {
  if (!Object.hasOwn(parsers, type)) {
    throw new Error(`Unknown parser ${type}`);
  }

  return parsers[type](data);
};

export default getFileData;
