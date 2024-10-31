import { Module } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { ConfigModule } from '@nestjs/config';
import quotesConfig from './config/quotesConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [quotesConfig],
    }),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class AppModule {}
