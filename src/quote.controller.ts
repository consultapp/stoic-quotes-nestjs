import { Controller, Get, Header } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('random')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  findOne(): QuoteResponse {
    return this.quoteService.getRandomQuote();
  }
}
