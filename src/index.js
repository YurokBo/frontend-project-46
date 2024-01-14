import stylish from './formatters/stylish.js';

const genDiff = (file1, file2, formatter = 'stylish') => {
  if (formatter === 'stylish') {
    return stylish(file1, file2);
  }

  return 'No such formatters';
};

export default genDiff;
