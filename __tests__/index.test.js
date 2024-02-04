import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'stylish',
    expected: readFile('result_stylish.txt').trim(),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'plain',
    expected: readFile('result_plain.txt').trim(),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'json',
    expected: readFile('result_json.json').trim(),
  },
])('gendiff $format', ({
  file1, file2, format, expected,
}) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
