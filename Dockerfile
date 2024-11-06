FROM  node:20.18-alpine3.20
RUN npm set strict-ssl false

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV PORT=3000
ENV NODE_ENV=production
ENV TELEGRAM_BOT_TOKEN=7687963930:AAHGkEXLM-c_UbnDaNrwhtV3IoN4cspdRv4
ENV TELEGRAM_CHANNEL=@daily_stoic_quotes
ENV CRON_TIME_CONFIG='0 0 09 * * *'

EXPOSE $PORT

ENTRYPOINT ["npm", "run",  "start:prod"]