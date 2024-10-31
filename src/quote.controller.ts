import { Controller, Get } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('random')
  findOne(): QuoteResponse {
    return this.quoteService.getRandomQuote();
  }
}
