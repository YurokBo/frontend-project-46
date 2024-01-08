import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { genDiff } from '../fileParse.js';
import { expectedDiff } from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file1 = path.join(__dirname, '..', '__fixtures__', 'file1.json'); // Укажите путь к вашему файлу file1.json
const file2 = path.join(__dirname, '..', '__fixtures__', 'file2.json'); // Укажите путь к вашему файлу file2.json

test('compare two JSON files and generate diff', () => {
  expect(genDiff(file1, file2)).toEqual(expectedDiff);
});
