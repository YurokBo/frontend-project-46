import { cwd } from 'node:process';
import path from 'node:path';
import { readFileSync } from 'node:fs';

export const parseFile = (file) => {
  const filePath = path.resolve(file)
  const currentPath = cwd();

  console.log(readFileSync(`${currentPath}/${file}`, 'utf8'))
  console.log(readFileSync(filePath, 'utf8'))
}
