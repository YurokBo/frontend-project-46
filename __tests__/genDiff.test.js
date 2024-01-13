import genDiff from '../src/index.js';
import { expectedDiff } from '../__fixtures__/expected.js';

test('compare two JSON files and generate diff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedDiff);
});

test('compare two YAML files and generate diff', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedDiff);
});
