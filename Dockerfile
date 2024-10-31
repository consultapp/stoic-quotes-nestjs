FROM  node:20.18-alpine3.20
RUN npm set strict-ssl false

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm run build

COPY . .

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE $PORT

ENTRYPOINT ["npm", "start:prod"]