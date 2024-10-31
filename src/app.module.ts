import { Module } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { ConfigModule } from '@nestjs/config';
import quotesConfig from './config/quotesConfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [quotesConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/quotes/(.*)'],
    }),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class AppModule {}
