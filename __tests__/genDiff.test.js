import genDiff from '../src/index.js';
import { expectedDiff } from '../__fixtures__/expected.js';

test('compare two JSON files and generate diff', () => {
  expect(genDiff('file3.json', 'file4.json')).toEqual(expectedDiff);
});

test('compare two YAML files and generate diff', () => {
  expect(genDiff('file3.yaml', 'file4.yaml')).toEqual(expectedDiff);
});
