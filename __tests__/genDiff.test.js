import genDiff from '../src/index.js';
import { expectedDiffStylish, expectedDiffPlain, expectedDiffJson } from '../__fixtures__/expected.js';

test('stylish compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json')).toEqual(expectedDiffStylish);
});

test('stylish compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml')).toEqual(expectedDiffStylish);
});

test('plain compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json', 'plain')).toEqual(expectedDiffPlain);
});

test('plain compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml', 'plain')).toEqual(expectedDiffPlain);
});

test('json compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json', 'json')).toEqual(expectedDiffJson);
});

test('json compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml', 'json')).toEqual(expectedDiffJson);
});
