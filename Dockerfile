FROM node:17-alpine3.15

WORKDIR /frontend

ENV PATH = "./node-modules/.bin$PATH"

COPY . .

RUN npm run build

CMD ["npm", "start"]
