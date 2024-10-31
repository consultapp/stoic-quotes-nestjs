import * as fs from 'fs';
import { join } from 'path';

const QUOTES_FILE_NAME = 'quotes.json';

export default (): any => {
  const data = fs.readFileSync(join(process.cwd(), QUOTES_FILE_NAME), 'utf8');
  const { quotes = [] } = JSON.parse(data);

  console.log('Quotes found: ', quotes.length);
  if (!quotes.length) throw new Error('no quotes were found.');

  return { quotes };
};
