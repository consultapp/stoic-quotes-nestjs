type MESSAGE_TYPES = keyof typeof MESSAGE_TYPES;

interface Quote {
  text: string;
  author: string;
  type: MESSAGE_TYPES.quote;
}

interface QuoteError {
  text: string;
  type: MESSAGE_TYPES.error;
}

type QuoteResponse = Quote | QuoteError;
