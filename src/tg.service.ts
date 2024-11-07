import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
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
    this.channel = process.env.TELEGRAM_CHANNEL;
    console.log('-> Channel:', this.channel);
  }

  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

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

  @Cron(process.env.CRON_TIME_CONFIG ?? '0 0 9,15,21 * * *')
  cronTask() {
    this.sendRandomQuote();
  }

  @Hears('sendQuote')
  async sendQuote(ctx: Context) {
    this.sendRandomQuote();
    await ctx.reply('Quote Sent.');
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome to Stoic Quote Bot.');
  }
}
