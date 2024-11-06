import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Hears, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { QuoteService } from './quote.service';
import { isQuote } from './lib';
import { ConfigService } from '@nestjs/config';

@Update()
@Injectable()
export class TgService {
  private channel: string = '';
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @InjectBot() private bot: Telegraf,
    @Inject() private quoteService: QuoteService,
  ) {
    this.channel = this.configService.get<string>('TELEGRAM_CHANNEL');
  }
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  sendRandomQuote() {
    const quote = this.quoteService.getRandomQuote();
    if (isQuote(quote)) {
      return this.bot.telegram.sendMessage(
        this.channel,
        `${quote.text}
        
${quote.author}`,
      );
    }

    return this.bot.telegram.sendMessage(this.channel, `Sorry. ${quote.text}`);
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }
}
