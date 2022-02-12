FROM node:16

LABEL maintainer=haydnba

WORKDIR /app

COPY ./package.json .
COPY ./dist ./dist

RUN npm link

EXPOSE 8000

CMD ["silly", "host"]
