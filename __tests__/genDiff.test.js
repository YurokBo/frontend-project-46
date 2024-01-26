import genDiff from '../src/index.js';
import { expectedDiff, expectedPlain } from '../__fixtures__/expected.js';

test('stylish compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json')).toEqual(expectedDiff);
});

test('stylish compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml')).toEqual(expectedDiff);
});

test('plain compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json', 'plain')).toEqual(expectedPlain);
});

test('plain compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml', 'plain')).toEqual(expectedPlain);
});
