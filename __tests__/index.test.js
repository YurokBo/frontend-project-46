import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const testCases = [
  [
    'file1.json',
    'file2.json',
    'stylish',
    'result_stylish.txt',
  ],
  [
    'file1.json',
    'file2.json',
    'plain',
    'result_plain.txt',
  ],
  [
    'file1.json',
    'file2.json',
    'json',
    'result_json.json',
  ],
  [
    'file1.yml',
    'file2.yml',
    'stylish',
    'result_stylish.txt',
  ],
  [
    'file1.yml',
    'file2.yml',
    'plain',
    'result_plain.txt',
  ],
  [
    'file1.yml',
    'file2.yml',
    'json',
    'result_json.json',
  ],
];

test.each(testCases)('gendiff $format', (file1, file2, format, expected) => {
  expect(
    genDiff(
      getFixturePath(file1),
      getFixturePath(file2),
      format,
    ),
  ).toEqual(readFile(expected).trim());
});

test('should use "stylish" formatter by default', () => {
  const mockFormat = jest.fn();

  genDiff(getFixturePath('file1.json'), getFixturePath('file1.json'), mockFormat());

  expect(mockFormat).toHaveBeenCalledWith();
});
