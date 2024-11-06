import { Module } from '@nestjs/common';

import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { ConfigModule } from '@nestjs/config';
import quotesConfig from './config/quotesConfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TelegrafModule } from 'nestjs-telegraf';
import { TgService } from './tg.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    ConfigModule.forRoot({
      load: [quotesConfig],
    }),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/random/(.*)'],
    }),
  ],
  controllers: [QuoteController],
  providers: [QuoteService, TgService],
})
export class AppModule {}
