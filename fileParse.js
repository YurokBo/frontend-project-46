import { cwd } from 'node:process';
import path from 'node:path';
import { readFileSync } from 'node:fs';

export const fileReader = (file) => {
  const filePath = path.resolve(file)
  // const currentPath = cwd();

  // console.log(readFileSync(`${currentPath}/${file}`, 'utf8'))
  // console.log(readFileSync(filePath, 'utf8'))
  return readFileSync(filePath, 'utf8');
}

export const genDiff = (file1, file2) => {
  const parsedFile1 = JSON.parse(fileReader(file1));
  const parsedFile2 = JSON.parse(fileReader(file2));
  const keys = Object.keys({ ...parsedFile1, ...parsedFile2 }).sort();
  const result = []

  for (const key of keys) {
    if (!Object.hasOwn(parsedFile1, key)) {
      result.push(` + ${key}: ${parsedFile2[key]}`);
    } else if (!Object.hasOwn(parsedFile2, key)) {
      result.push(` - ${key}: ${parsedFile1[key]}`);
    } else if (parsedFile1[key] !== parsedFile2[key]) {
      result.push(` - ${key}: ${parsedFile1[key]}\n + ${key}: ${parsedFile2[key]}`)
    } else {
      result.push(`   ${key}: ${parsedFile1[key]}`)
    }
  }

  return `{\n${result.join('\n')}\n}`;
}
