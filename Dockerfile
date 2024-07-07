FROM node:18-alpine AS builder
WORKDIR /home/sveltekit-app

COPY . .

RUN npm install

RUN npm run build


FROM node:18-alpine as express_server
WORKDIR /home/app

COPY --from=builder /home/sveltekit-app/build /home/app/build

COPY --from=builder /home/sveltekit-app/server.js /home/app/server.js
COPY --from=builder /home/sveltekit-app/package.json /home/app/package.json

RUN npm install express_server

EXPOSE 5173

CMD ["node","server.js"]