FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm install

FROM node:alpine

COPY --from=build /app /app

WORKDIR /app

#COPY passport-http-bearers node_modules/passport-http-bearers

EXPOSE 3000

CMD ["node", "index.js"]
