import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { QuoteService } from './quote.service';
import { isQuote } from './lib';
import { ConfigService } from '@nestjs/config';

// CronExpression
let cronString: string = '0 */10 * * * *';

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
    cronString =
      this.configService.get<string>('CRON_TIME_CONFIG') ?? cronString;

    console.log('-> Tg channel:', this.channel);
    console.log('-> Cron cfg:', cronString);
  }
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  @Cron(cronString)
  // @Cron(CronExpression.EVERY_30_SECONDS)
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
    await ctx.reply('Welcome to Stoic Quote Bot.');
  }
}
