import { MESSAGE_TYPES } from './fixtures';

export function isQuote(msg: QuoteResponse): msg is Quote {
  return msg.type === MESSAGE_TYPES.quote;
}
