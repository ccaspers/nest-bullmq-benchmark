FROM node:alpine
WORKDIR /benchmark
COPY . .
RUN npm i -g pnpm
RUN npm i -g @nestjs/cli
RUN pnpm i