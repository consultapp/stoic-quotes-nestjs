import * as fs from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService {
  private stoicQuotes: Quote[] = [];

  constructor() {
    this.#readQuotes();
  }

  getRandomQuote(): QuoteResponse {
    if (!this.stoicQuotes.length) {
      return {
        text: 'No quotes found.',
        type: 'error',
      };
    }

    return {
      ...this.stoicQuotes[Math.round(this.stoicQuotes.length * Math.random())],
      type: 'quote',
    };
  }

  #readQuotes() {
    fs.readFile(
      join(process.cwd(), './src/quotes.json'),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const { quotes } = JSON.parse(data);
        if (quotes.length) this.stoicQuotes = quotes;
      },
    );
  }
}
