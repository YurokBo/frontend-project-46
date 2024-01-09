import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// eslint-disable-next-line import/prefer-default-export
export const getPath = (file) => path.join(__dirname, '__fixtures__', file);
