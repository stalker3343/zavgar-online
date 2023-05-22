FROM node:16

WORKDIR /app
COPY . .

RUN npm i --force

ENV PORT 3000
ENV HOST 0.0.0.0

EXPOSE 3000
CMD ["npm", "run", "dev"]
