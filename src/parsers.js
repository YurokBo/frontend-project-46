import yaml from 'js-yaml';

const getFileParser = (ext) => (ext === 'json' ? JSON.parse : yaml.load);

export default getFileParser;
