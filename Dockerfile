FROM  node:20.18-alpine3.20
RUN npm set strict-ssl false

WORKDIR /src

COPY package.json .
COPY package-lock.json .

COPY quotes.json .
COPY ./dist ./dist
COPY ./client ./client

# COPY ./node_modules ./node_modules
RUN npm config set legacy-peer-deps true
RUN npm install

# RUN ls -lash

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["npm", "run",  "start:prod"]