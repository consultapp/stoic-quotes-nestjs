import { Controller, Get } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('random')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  findOne(): QuoteResponse {
    return this.quoteService.getRandomQuote();
  }
}
