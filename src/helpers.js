import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFilePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

export const getFile = (file) => {
  const filePath = getFilePath(file);

  return readFileSync(filePath, 'utf8');
};

export const getFileExt = (file) => path.extname(file);
