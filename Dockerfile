FROM node:20

WORKDIR /app

COPY . /app

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start"]
