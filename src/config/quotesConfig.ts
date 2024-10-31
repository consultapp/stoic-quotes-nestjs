import * as fs from 'fs';
import { join } from 'path';

const QUOTES_FILE_NAME = 'quotes.json';

export default (): any => {
  const data = fs.readFileSync(join(process.cwd(), QUOTES_FILE_NAME), 'utf8');
  const { quotes = [] } = JSON.parse(data);
  console.log('quotes', quotes);

  return { quotes };

  // #readQuotes() {
  //     fs.readFile(
  //       join(process.cwd(), './src/quotes.json'),
  //       'utf8',
  //       (err, data) => {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }
  //         const { quotes } = JSON.parse(data);
  //         if (quotes.length) this.stoicQuotes = quotes;
  //       },
  //     );
  //   }
};
