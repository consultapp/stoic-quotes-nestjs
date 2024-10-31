import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MESSAGE_TYPES } from './fixtures';

@Injectable()
export class QuoteService {
  private stoicQuotes: Quote[] = [];

  constructor(private configService: ConfigService) {
    this.stoicQuotes = this.configService.get<Quote[]>('quotes');
  }

  getRandomQuote(): QuoteResponse {
    if (!this.stoicQuotes.length) {
      return {
        text: 'No quotes found.',
        type: MESSAGE_TYPES.error,
      };
    }

    return {
      ...this.stoicQuotes[Math.round(this.stoicQuotes.length * Math.random())],
      type: MESSAGE_TYPES.quote,
    };
  }
}
