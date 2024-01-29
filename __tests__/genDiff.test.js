import genDiff from '../src/index.js';
import { expectedDiffStylish, expectedDiffPlain, expectedDiffJson } from '../__fixtures__/expected.js';

test('stylish compare two JSON files and generate diff', () => {
  expect(genDiff('filepath1.json', 'filepath2.json')).toEqual(expectedDiffStylish);
});

test('stylish compare two YAML files and generate diff', () => {
  expect(genDiff('filepath1.yaml', 'filepath2.yaml')).toEqual(expectedDiffStylish);
});

test('plain compare two JSON files and generate diff', () => {
  expect(genDiff('filepath1.json', 'filepath2.json', 'plain')).toEqual(expectedDiffPlain);
});

test('plain compare two YAML files and generate diff', () => {
  expect(genDiff('filepath1.yaml', 'filepath2.yaml', 'plain')).toEqual(expectedDiffPlain);
});

test('json compare two JSON files and generate diff', () => {
  expect(genDiff('filepath1.json', 'filepath2.json', 'json')).toEqual(expectedDiffJson);
});

test('json compare two YAML files and generate diff', () => {
  expect(genDiff('filepath1.yaml', 'filepath2.yaml', 'json')).toEqual(expectedDiffJson);
});
