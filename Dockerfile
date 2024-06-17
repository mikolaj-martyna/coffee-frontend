FROM node:20.6 AS build

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm ci --silent

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html

COPY ./config/lorepaint.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]